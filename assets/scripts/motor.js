export class Vaga {
    constructor({
        id,
        titulo,
        area,
        empresa,
        localizacao,
        modelo,
        tipo,
        salario,
        descricao,
        requisitos,
        publicadoEm
    }) {
        this.id = id;
        this.titulo = titulo;
        this.area = area;
        this.empresa = empresa;
        this.localizacao = localizacao;
        this.modelo = modelo;
        this.tipo = tipo;
        this.salario = salario;
        this.descricao = descricao;
        this.requisitos = requisitos;
        this.publicadoEm = publicadoEm;
        this.compatibilidade = 0;
    }

    calcularCompatibilidade(habilidadesUsuario = []) {
        if (!Array.isArray(habilidadesUsuario) || this.requisitos.length === 0) {
            return 0;
        }

        const habilidades = habilidadesUsuario.map(normalizarTexto);

        const correspondentes = this.requisitos.filter(requisito =>
            habilidades.includes(normalizarTexto(requisito))
        );

        this.compatibilidade = Math.round(
            (correspondentes.length / this.requisitos.length) * 100
        );

        return this.compatibilidade;
    }

    obterHabilidadesFaltantes(habilidadesUsuario = []) {
        const habilidades = habilidadesUsuario.map(normalizarTexto);

        return this.requisitos.filter(
            requisito => !habilidades.includes(normalizarTexto(requisito))
        );
    }

    obterClassificacao() {
        if (this.compatibilidade >= 80) return "Excelente compatibilidade";
        if (this.compatibilidade >= 60) return "Boa compatibilidade";
        if (this.compatibilidade >= 40) return "Compatibilidade média";
        return "Baixa compatibilidade";
    }
}

export class VagaEstagio extends Vaga {
    constructor(dadosVaga) {
        super(dadosVaga);
        this.nivel = "Estágio";
    }

    obterClassificacao() {
        if (this.compatibilidade >= 70) return "Ótima oportunidade de estágio";
        if (this.compatibilidade >= 40) return "Boa oportunidade para aprender";
        return "Requer mais preparação";
    }
}

export function normalizarTexto(texto = "") {
    return String(texto)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase();
}

export function criarInstanciasDeVagas(dadosVagas = []) {
    return dadosVagas.map(vaga =>
        normalizarTexto(vaga.tipo) === "estagio"
            ? new VagaEstagio(vaga)
            : new Vaga(vaga)
    );
}

export function analisarCompatibilidade(vagas = [], habilidadesUsuario = []) {
    return vagas.map(vaga => {
        vaga.calcularCompatibilidade(habilidadesUsuario);
        return vaga;
    });
}

export function ordenarPorCompatibilidade(vagas = []) {
    return [...vagas].sort(
        (a, b) => b.compatibilidade - a.compatibilidade
    );
}

export function encontrarMelhorVaga(vagas = []) {
    if (!vagas.length) return null;

    return vagas.reduce((melhor, vaga) =>
        vaga.compatibilidade > melhor.compatibilidade ? vaga : melhor
    );
}

export function encontrarVagaPorId(vagas = [], idVaga) {
    return vagas.find(vaga => vaga.id === Number(idVaga));
}

export function filtrarVagasPorArea(vagas = [], areaSelecionada = "todas") {
    const area = normalizarTexto(areaSelecionada);

    return area === "todas"
        ? vagas
        : vagas.filter(vaga => normalizarTexto(vaga.area) === area);
}

export function pesquisarVagas(vagas = [], termoPesquisa = "") {
    const termo = normalizarTexto(termoPesquisa);

    if (!termo) return vagas;

    return vagas.filter(vaga => {
        const dados = [
            vaga.titulo,
            vaga.empresa,
            vaga.area,
            vaga.localizacao,
            vaga.modelo,
            vaga.tipo
        ];

        return (
            dados.some(item => normalizarTexto(item).includes(termo)) ||
            vaga.requisitos.some(req => normalizarTexto(req).includes(termo))
        );
    });
}

export function aplicarFiltros(
    vagas = [],
    areaSelecionada = "todas",
    termoPesquisa = ""
) {
    return pesquisarVagas(
        filtrarVagasPorArea(vagas, areaSelecionada),
        termoPesquisa
    );
}

export function percorrerVagas(vagas = [], callback) {
    if (typeof callback !== "function") return;

    vagas.forEach(callback);
}

export function criarControleDeFiltro(filtroInicial = "todas") {
    let filtroAtual = filtroInicial;

    return {
        definirFiltro(novoFiltro) {
            filtroAtual = novoFiltro;
        },

        obterFiltro() {
            return filtroAtual;
        },

        aplicar(vagas) {
            return filtrarVagasPorArea(vagas, filtroAtual);
        }
    };
}

export function gerarResumoDasVagas(vagas = []) {
    return vagas.reduce(
        (resumo, vaga) => {
            resumo.total++;

            if (vaga.modelo === "Remoto") resumo.remotas++;
            if (vaga.tipo === "Estágio") resumo.estagios++;
            if (vaga.compatibilidade >= 60) resumo.recomendadas++;

            return resumo;
        },
        {
            total: 0,
            remotas: 0,
            estagios: 0,
            recomendadas: 0
        }
    );
}

export function obterVagasRecomendadas(vagas = [], percentualMinimo = 60) {
    return vagas.filter(
        vaga => vaga.compatibilidade >= percentualMinimo
    );
}

export function agruparVagasPorArea(vagas = []) {
    return vagas.reduce((grupos, vaga) => {
        const area = vaga.area || "Outras";

        (grupos[area] ??= []).push(vaga);

        return grupos;
    }, {});
}

export function obterSugestoesDeEstudo(
    vagas = [],
    habilidadesUsuario = []
) {
    return [
        ...new Set(
            vagas.flatMap(vaga =>
                vaga.obterHabilidadesFaltantes(habilidadesUsuario)
            )
        )
    ];
}