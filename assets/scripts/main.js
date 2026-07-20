import {
    salvarPerfil,
    criarPerfilPeloFormulario,
    carregarVagas,
    carregarPerfil,
    existePerfilCadastrado
} from "./dados.js";

import {
    criarInstanciasDeVagas,
    analisarCompatibilidade,
    ordenarPorCompatibilidade,
    encontrarMelhorVaga,
    aplicarFiltros,
    criarControleDeFiltro
} from "./motor.js";

import {
    configurarPerfil,
    preencherPerfil,
    configurarEdicaoPerfil,
    mostrarMensagem,
    exibirVagas,
    exibirMelhorVaga,
    exibirBoasVindas,
    configurarPesquisa,
    configurarFiltros
} from "./ui.js";

const formulario = document.getElementById("formPerfil");

let todasAsVagas = [];
let perfilUsuario = null;
let termoPesquisaAtual = "";

const controleFiltro = criarControleDeFiltro("todas");

function iniciarCadastro() {
    if (!formulario) {
        return;
    }

    const botoesSkills = document.querySelectorAll(".skill-tag");
    const habilidadesSelecionadas = [];

    botoesSkills.forEach(botao => {
        botao.addEventListener("click", () => {
            botao.classList.toggle("active");

            const habilidade = botao.textContent.trim();
            const indice = habilidadesSelecionadas.indexOf(habilidade);

            if (indice === -1) {
                habilidadesSelecionadas.push(habilidade);
            } else {
                habilidadesSelecionadas.splice(indice, 1);
            }
        });
    });

    formulario.addEventListener("submit", evento => {
        evento.preventDefault();

        try {
            const perfil = criarPerfilPeloFormulario(
                formulario,
                habilidadesSelecionadas
            );

            salvarPerfil(perfil);
            window.location.href = "./vagas.html";
        } catch (erro) {
            alert(erro.message);
        }
    });
}

function atualizarInterface() {
    const vagasFiltradas = aplicarFiltros(
        todasAsVagas,
        controleFiltro.obterFiltro(),
        termoPesquisaAtual
    );

    const vagasOrdenadas = ordenarPorCompatibilidade(vagasFiltradas);

    exibirVagas(
        vagasOrdenadas,
        perfilUsuario.habilidades
    );
}

function atualizarDadosDoPerfil(perfilAtualizado) {
    perfilUsuario = perfilAtualizado;

    todasAsVagas = analisarCompatibilidade(
        todasAsVagas,
        perfilUsuario.habilidades
    );

    todasAsVagas = ordenarPorCompatibilidade(todasAsVagas);

    const melhorVaga = encontrarMelhorVaga(todasAsVagas);

    exibirBoasVindas(perfilUsuario);

    exibirMelhorVaga(
        melhorVaga,
        perfilUsuario.habilidades
    );

    atualizarInterface();
}

function configurarEventos() {
    configurarPerfil();

    configurarEdicaoPerfil(
        perfilUsuario,
        atualizarDadosDoPerfil
    );

    configurarPesquisa(termoPesquisa => {
        termoPesquisaAtual = termoPesquisa;
        atualizarInterface();
    });

    configurarFiltros(areaSelecionada => {
        controleFiltro.definirFiltro(areaSelecionada);
        atualizarInterface();
    });
}

async function iniciarPaginaVagas() {
    try {
        if (!existePerfilCadastrado()) {
            window.location.replace("./index.html");
            return;
        }

        perfilUsuario = carregarPerfil();

        if (!perfilUsuario) {
            window.location.replace("./index.html");
            return;
        }

        mostrarMensagem("Carregando vagas...");

        const dadosVagas = await carregarVagas();
        const instanciasVagas = criarInstanciasDeVagas(dadosVagas);

        todasAsVagas = analisarCompatibilidade(
            instanciasVagas,
            perfilUsuario.habilidades
        );

        todasAsVagas = ordenarPorCompatibilidade(todasAsVagas);

        const melhorVaga = encontrarMelhorVaga(todasAsVagas);

        preencherPerfil(perfilUsuario);
        exibirBoasVindas(perfilUsuario);

        exibirMelhorVaga(
            melhorVaga,
            perfilUsuario.habilidades
        );

        exibirVagas(
            todasAsVagas,
            perfilUsuario.habilidades
        );

        configurarEventos();
    } catch (erro) {
        console.error("Erro ao iniciar a página:", erro);

        mostrarMensagem(
            erro.message || "Não foi possível carregar a página."
        );
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (formulario) {
        if (existePerfilCadastrado()) {
            window.location.replace("./vagas.html");
            return;
        }

        iniciarCadastro();
        return;
    }

    iniciarPaginaVagas();
});