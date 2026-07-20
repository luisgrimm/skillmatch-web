const CHAVE_PERFIL = "skillMatchPerfil";
const CAMINHO_VAGAS = "./assets/dados/vagas.json";

export async function carregarVagas() {
    try {
        const resposta = await fetch(CAMINHO_VAGAS);

        if (!resposta.ok) {
            throw new Error(`Não foi possível carregar as vagas. Erro: ${resposta.status}`);
        }

        const vagas = await resposta.json();

        if (!Array.isArray(vagas)) {
            throw new Error("O arquivo de vagas não possui um formato válido.");
        }

        return vagas;
    } catch (erro) {
        console.error("Erro ao carregar vagas:", erro);
        throw new Error("Não foi possível carregar as vagas. Tente novamente.");
    }
}

export function salvarPerfil(perfil) {
    if (!perfil || typeof perfil !== "object") {
        throw new Error("O perfil informado é inválido.");
    }

    const perfilValidado = validarPerfil(perfil);

    try {
        localStorage.setItem(CHAVE_PERFIL, JSON.stringify(perfilValidado));
        return perfilValidado;
    } catch (erro) {
        console.error("Erro ao salvar perfil:", erro);
        throw new Error("Não foi possível salvar o perfil.");
    }
}

export function carregarPerfil() {
    try {
        const perfilSalvo = localStorage.getItem(CHAVE_PERFIL);

        if (!perfilSalvo) {
            return null;
        }

        return validarPerfil(JSON.parse(perfilSalvo));
    } catch (erro) {
        console.error("Erro ao carregar perfil:", erro);
        return null;
    }
}

export function atualizarPerfil(novosDados) {
    const perfilAtual = carregarPerfil();

    if (!perfilAtual) {
        throw new Error("Nenhum perfil foi encontrado para atualização.");
    }

    return salvarPerfil({
        ...perfilAtual,
        ...novosDados
    });
}

export function existePerfilCadastrado() {
    return carregarPerfil() !== null;
}

export function removerPerfil() {
    try {
        localStorage.removeItem(CHAVE_PERFIL);
        return true;
    } catch (erro) {
        console.error("Erro ao remover perfil:", erro);
        return false;
    }
}

function validarPerfil(perfil) {
    const nome = String(perfil.nome || "").trim();
    const email = String(perfil.email || "").trim();
    const curso = String(perfil.curso || "").trim();
    const localizacao = String(perfil.localizacao || perfil.cidade || "").trim();
    const experiencia = Number(perfil.experiencia || 0);

    const habilidades = Array.isArray(perfil.habilidades)
        ? perfil.habilidades
              .map(habilidade => String(habilidade).trim())
              .filter(Boolean)
        : [];

    if (!nome) {
        throw new Error("O nome do usuário é obrigatório.");
    }

    if (!curso) {
        throw new Error("O curso ou área profissional é obrigatório.");
    }

    if (habilidades.length === 0) {
        throw new Error("Selecione pelo menos uma habilidade.");
    }

    return {
        nome,
        email,
        curso,
        experiencia,
        localizacao,
        habilidades
    };
}

export function criarPerfilPeloFormulario(formulario, habilidadesSelecionadas = []) {
    if (!(formulario instanceof HTMLFormElement)) {
        throw new Error("O formulário informado é inválido.");
    }

    const dadosFormulario = new FormData(formulario);

    return validarPerfil({
        nome: dadosFormulario.get("nome"),
        email: dadosFormulario.get("email"),
        curso: dadosFormulario.get("area"),
        experiencia: dadosFormulario.get("experiencia"),
        localizacao: dadosFormulario.get("localizacao") || dadosFormulario.get("cidade"),
        habilidades: habilidadesSelecionadas
    });
}

export function salvarDado(chave, valor) {
    if (!chave) {
        return false;
    }

    try {
        localStorage.setItem(chave, JSON.stringify(valor));
        return true;
    } catch (erro) {
        console.error(`Erro ao salvar o dado "${chave}":`, erro);
        return false;
    }
}

export function carregarDado(chave, valorPadrao = null) {
    if (!chave) {
        return valorPadrao;
    }

    try {
        const dadoSalvo = localStorage.getItem(chave);

        if (dadoSalvo === null) {
            return valorPadrao;
        }

        return JSON.parse(dadoSalvo);
    } catch (erro) {
        console.error(`Erro ao carregar o dado "${chave}":`, erro);
        return valorPadrao;
    }
}