import { atualizarPerfil } from "./dados.js";

const listaVagas = document.getElementById("listaVagas");
const melhorVaga = document.getElementById("melhorVaga");
const perfil = document.getElementById("perfil");
const btnPerfil = document.getElementById("btnPerfil");
const btnFecharPerfil = document.getElementById("btnFecharPerfil");
const btnEditarPerfil = document.getElementById("btnEditarPerfil");
const perfilNome = document.getElementById("perfilNome");
const perfilArea = document.getElementById("perfilArea");
const perfilExperiencia = document.getElementById("perfilExperiencia");
const perfilHabilidades = document.getElementById("perfilHabilidades");
const formEditarPerfil = document.getElementById("formEditarPerfil");
const editarNome = document.getElementById("editarNome");
const editarArea = document.getElementById("editarArea");
const editarExperiencia = document.getElementById("editarExperiencia");
const btnCancelarEdicao = document.getElementById("btnCancelarEdicao");
const botoesHabilidadesEdicao = document.querySelectorAll(".skill-edicao");
const campoPesquisa = document.getElementById("campoPesquisa");
const botoesFiltro = document.querySelectorAll(".filtro");
const mensagemPerfil = document.getElementById("mensagemPerfil");

export function abrirPerfil() {
    perfil.classList.add("aberto");
}

export function fecharPerfil() {
    perfil.classList.remove("aberto");
}

export function preencherPerfil(perfilUsuario) {
    perfilNome.textContent = perfilUsuario.nome;
    perfilArea.textContent = perfilUsuario.curso;
    perfilExperiencia.textContent =
        perfilUsuario.experiencia !== undefined
            ? `${perfilUsuario.experiencia} ano(s)`
            : "Não informado";

    perfilHabilidades.innerHTML = "";

    perfilUsuario.habilidades.forEach(habilidade => {
        const item = document.createElement("li");
        item.textContent = habilidade;
        perfilHabilidades.appendChild(item);
    });
}

export function mostrarMensagem(texto) {
    listaVagas.innerHTML = "";

    const mensagem = document.createElement("p");
    mensagem.className = "mensagem";
    mensagem.textContent = texto;

    listaVagas.appendChild(mensagem);
}

export function limparListaVagas() {
    listaVagas.innerHTML = "";
}

export function configurarEdicaoPerfil(perfilUsuario, callbackAtualizacao) {
    let habilidadesSelecionadas = [...perfilUsuario.habilidades];

    function atualizarBotoesHabilidades() {
        botoesHabilidadesEdicao.forEach(botao => {
            const habilidade = botao.textContent.trim();

            botao.classList.toggle(
                "ativa",
                habilidadesSelecionadas.includes(habilidade)
            );
        });
    }

    btnEditarPerfil.addEventListener("click", () => {
        editarNome.value = perfilUsuario.nome;
        editarArea.value = perfilUsuario.curso;
        editarExperiencia.value = perfilUsuario.experiencia ?? 0;
        habilidadesSelecionadas = [...perfilUsuario.habilidades];

        atualizarBotoesHabilidades();

        formEditarPerfil.hidden = false;
        btnEditarPerfil.hidden = true;
    });

    botoesHabilidadesEdicao.forEach(botao => {
        botao.addEventListener("click", () => {
            const habilidade = botao.textContent.trim();
            const indice = habilidadesSelecionadas.indexOf(habilidade);

            if (indice === -1) {
                habilidadesSelecionadas.push(habilidade);
            } else {
                habilidadesSelecionadas.splice(indice, 1);
            }

            atualizarBotoesHabilidades();
        });
    });

    btnCancelarEdicao.addEventListener("click", () => {
        formEditarPerfil.hidden = true;
        btnEditarPerfil.hidden = false;
    });

    formEditarPerfil.addEventListener("submit", evento => {
        evento.preventDefault();

        if (habilidadesSelecionadas.length === 0) {
            alert("Selecione pelo menos uma habilidade.");
            return;
        }

        const perfilSalvo = atualizarPerfil({
            nome: editarNome.value.trim(),
            curso: editarArea.value,
            experiencia: Number(editarExperiencia.value),
            habilidades: habilidadesSelecionadas
        });

        Object.assign(perfilUsuario, perfilSalvo);
        preencherPerfil(perfilUsuario);

        formEditarPerfil.hidden = true;
        btnEditarPerfil.hidden = false;

        if (typeof callbackAtualizacao === "function") {
            callbackAtualizacao(perfilUsuario);
        }
    });
}

function criarElemento(tag, classe = "", texto = "") {
    const elemento = document.createElement(tag);

    if (classe) {
        elemento.className = classe;
    }

    if (texto) {
        elemento.textContent = texto;
    }

    return elemento;
}

function criarListaRequisitos(requisitos = []) {
    const lista = criarElemento("ul", "lista-requisitos");

    requisitos.forEach(requisito => {
        lista.appendChild(
            criarElemento("li", "requisito", requisito)
        );
    });

    return lista;
}

function criarCompatibilidade(vaga) {
    const container = criarElemento("section", "compatibilidade");
    const cabecalho = criarElemento(
        "header",
        "compatibilidade-cabecalho"
    );

    cabecalho.append(
        criarElemento("h4", "", "Compatibilidade"),
        criarElemento("strong", "", `${vaga.compatibilidade}%`)
    );

    const barra = criarElemento("div", "barra-compatibilidade");
    const progresso = criarElemento(
        "span",
        "progresso-compatibilidade"
    );

    progresso.style.width = `${vaga.compatibilidade}%`;
    barra.appendChild(progresso);

    container.append(
        cabecalho,
        barra,
        criarElemento(
            "p",
            "classificacao",
            vaga.obterClassificacao()
        )
    );

    return container;
}

function criarInformacoesVaga(vaga) {
    const lista = criarElemento("ul", "informacoes-vaga");

    [
        vaga.localizacao,
        vaga.modelo,
        vaga.tipo,
        vaga.salario
    ]
        .filter(Boolean)
        .forEach(informacao => {
            lista.appendChild(criarElemento("li", "", informacao));
        });

    return lista;
}

function criarHabilidadesFaltantes(vaga, habilidadesUsuario = []) {
    const habilidadesFaltantes =
        vaga.obterHabilidadesFaltantes(habilidadesUsuario);

    const container = criarElemento(
        "section",
        "habilidades-faltantes"
    );

    container.appendChild(
        criarElemento(
            "h4",
            "",
            "Habilidades para desenvolver"
        )
    );

    if (habilidadesFaltantes.length === 0) {
        container.appendChild(
            criarElemento(
                "p",
                "",
                "Você possui todas as habilidades principais."
            )
        );

        return container;
    }

    container.appendChild(
        criarListaRequisitos(habilidadesFaltantes)
    );

    return container;
}

function criarCardVaga(vaga, habilidadesUsuario = []) {
    const artigo = criarElemento("article", "card-vaga");
    artigo.dataset.id = vaga.id;

    const cabecalho = criarElemento("header", "cabecalho-vaga");
    const textosCabecalho = criarElemento("section", "titulo-vaga");

    textosCabecalho.append(
        criarElemento("h2", "", vaga.titulo),
        criarElemento("p", "empresa-vaga", vaga.empresa),
        criarElemento("span", "area-vaga", vaga.area)
    );

    cabecalho.append(
        textosCabecalho,
        criarElemento(
            "strong",
            "porcentagem-vaga",
            `${vaga.compatibilidade}%`
        )
    );

    artigo.append(
        cabecalho,
        criarInformacoesVaga(vaga),
        criarElemento("p", "descricao-vaga", vaga.descricao),
        criarElemento("h3", "", "Requisitos"),
        criarListaRequisitos(vaga.requisitos),
        criarCompatibilidade(vaga),
        criarHabilidadesFaltantes(vaga, habilidadesUsuario)
    );

    return artigo;
}

export function exibirVagas(vagas = [], habilidadesUsuario = []) {
    limparListaVagas();

    if (vagas.length === 0) {
        mostrarMensagem("Nenhuma vaga foi encontrada.");
        return;
    }

    const fragmento = document.createDocumentFragment();

    vagas.forEach(vaga => {
        fragmento.appendChild(
            criarCardVaga(vaga, habilidadesUsuario)
        );
    });

    listaVagas.appendChild(fragmento);
}

export function exibirMelhorVaga(vaga, habilidadesUsuario = []) {
    melhorVaga.querySelector(".destaque-melhor-vaga")?.remove();

    if (!vaga) {
        melhorVaga.appendChild(
            criarElemento(
                "p",
                "destaque-melhor-vaga",
                "Nenhuma vaga compatível foi encontrada."
            )
        );

        return;
    }

    const artigo = criarElemento(
        "article",
        "destaque-melhor-vaga"
    );

    const cabecalho = criarElemento(
        "header",
        "cabecalho-melhor-vaga"
    );

    const tituloContainer = criarElemento("section");

    tituloContainer.append(
        criarElemento("h3", "", vaga.titulo),
        criarElemento("p", "", vaga.empresa)
    );

    cabecalho.append(
        tituloContainer,
        criarElemento(
            "strong",
            "percentual-melhor-vaga",
            `${vaga.compatibilidade}% compatível`
        )
    );

    artigo.append(
        cabecalho,
        criarInformacoesVaga(vaga),
        criarElemento(
            "p",
            "descricao-melhor-vaga",
            vaga.descricao
        ),
        criarHabilidadesFaltantes(vaga, habilidadesUsuario)
    );

    melhorVaga.appendChild(artigo);
}

export function exibirBoasVindas(perfilUsuario) {
    mensagemPerfil.textContent =
        `${perfilUsuario.nome}, encontramos as vagas mais compatíveis com suas habilidades.`;
}

export function configurarPesquisa(callback) {
    campoPesquisa.addEventListener("input", evento => {
        callback(evento.target.value);
    });
}

export function configurarFiltros(callback) {
    botoesFiltro.forEach(botao => {
        botao.addEventListener("click", () => {
            botoesFiltro.forEach(outroBotao => {
                outroBotao.classList.remove("ativo");
            });

            botao.classList.add("ativo");
            callback(botao.dataset.area || "todas");
        });
    });
}

export function configurarPerfil() {
    btnPerfil.addEventListener("click", abrirPerfil);
    btnFecharPerfil.addEventListener("click", fecharPerfil);

    document.addEventListener("keydown", evento => {
        if (evento.key === "Escape") {
            fecharPerfil();
        }
    });
}