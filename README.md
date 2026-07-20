# SkillMatch

## 📋 Sobre o projeto

O **SkillMatch** é uma aplicação web desenvolvida em **HTML, CSS e JavaScript puro** que auxilia candidatos a encontrarem vagas compatíveis com seu perfil profissional.

O usuário cadastra seu nome, área de atuação, tempo de experiência e habilidades técnicas. A partir dessas informações, o sistema compara automaticamente o perfil com um catálogo de vagas e calcula o percentual de compatibilidade para cada uma delas.

Além de indicar a vaga mais compatível, o SkillMatch também apresenta as habilidades que o candidato já possui, aquelas que ainda precisam ser desenvolvidas e uma recomendação de estudos para aumentar suas chances no mercado de trabalho.

---

# 🎯 Problema que o sistema resolve

Encontrar uma vaga adequada nem sempre é simples. Muitas vezes o candidato precisa analisar diversas descrições de vagas manualmente para descobrir quais realmente combinam com seu perfil.

O SkillMatch automatiza esse processo, realizando a comparação entre as habilidades do usuário e os requisitos das vagas, fornecendo rapidamente:

* Percentual de compatibilidade;
* Classificação da vaga (Alta, Média ou Baixa compatibilidade);
* Melhor oportunidade disponível;
* Recomendações de habilidades para estudo.

---

# 🚀 Funcionalidades

* Cadastro do perfil do candidato.
* Persistência dos dados utilizando LocalStorage.
* Carregamento das vagas através de um arquivo JSON utilizando Fetch API.
* Cálculo automático da compatibilidade.
* Classificação das vagas.
* Exibição da melhor vaga encontrada.
* Recomendações de estudo.
* Pesquisa de vagas.
* Filtros por modalidade e classificação.
* Edição do perfil.
* Interface responsiva para dispositivos móveis e desktop.

---

# 🛠 Tecnologias utilizadas

### Linguagens

* HTML5
* CSS3
* JavaScript ES6+

### Conceitos aplicados

* HTML Semântico
* SEO On-Page
* Acessibilidade (labels, aria-label, foco visível)
* Flexbox
* Mobile First
* Manipulação do DOM
* Eventos
* LocalStorage
* Fetch API
* Async/Await
* Promises
* JSON
* Programação Orientada a Objetos (Classes e Herança)
* Módulos ES (Import/Export)
* Métodos de Arrays:

  * map()
  * filter()
  * reduce()
  * find()
* Callback
* Closure

---

# 📁 Estrutura do projeto

```
skillmatch/

│── index.html
│── README.md

└── assets
    ├── dados
    │   └── vagas.json
    │
    ├── img
    │   └── logo.svg
    │
    ├── scripts
    │   ├── main.js
    │   ├── motor.js
    │   ├── ui.js
    │   └── dados.js
    │
    └── styles
        └── index.style.css
```

---

# ▶ Como executar

1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/skillmatch.git
```

2. Abra o projeto no Visual Studio Code.

3. Instale a extensão **Live Server**.

4. Clique com o botão direito no arquivo **index.html** e selecione **Open with Live Server**.

5. A aplicação será aberta automaticamente no navegador.

> **Importante:** como o projeto utiliza módulos ES e Fetch API, ele deve ser executado através de um servidor local (Live Server).

---

# 🧠 Como funciona

1. O usuário preenche seu perfil.
2. Os dados são salvos no LocalStorage.
3. O sistema busca as vagas do arquivo `vagas.json`.
4. O motor do SkillMatch compara as habilidades do candidato com os requisitos de cada vaga.
5. É calculado o percentual de compatibilidade.
6. As vagas são classificadas automaticamente.
7. A melhor vaga é destacada e são exibidas recomendações de estudo.

---

# 💡 Melhorias futuras

Algumas funcionalidades podem ser adicionadas futuramente:

* Login e cadastro de usuários.
* Cadastro de empresas.
* Banco de dados online.
* Integração com APIs reais de vagas de emprego.
* Favoritar vagas.
* Envio de currículo.
* Sistema de candidatura.
* Modo escuro.
* Notificações de novas vagas.
* Inteligência Artificial para recomendações personalizadas.
* Filtros avançados por salário, cidade e tecnologias.

---

# 📚 Conteúdos aplicados na disciplina

Este projeto foi desenvolvido utilizando os principais conteúdos estudados durante o módulo:

* HTML Semântico
* CSS Responsivo (Mobile First)
* Flexbox
* JavaScript Moderno
* DOM
* Eventos
* Objetos
* Classes
* Herança
* Métodos de Arrays
* Callback
* Closure
* Async/Await
* Fetch API
* LocalStorage
* Módulos ES
* Git e GitHub

---

# 👨‍💻 Autor

Projeto desenvolvido como atividade avaliativa da disciplina **Front-End React – Módulo 1**, aplicando os conceitos de desenvolvimento web estudados ao longo do semestre.
