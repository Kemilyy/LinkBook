# 📚 LinkBook

O **LinkBook** é uma aplicação web desenvolvida para facilitar a exploração de livros e editoras, oferecendo uma interface para visualizar informações, pesquisar obras e organizar favoritos.

## ✨ Funcionalidades

- **Página inicial:** apresentação do projeto e destaque de livros e editoras.
- **Busca e filtros:** auxílio na localização de livros e conteúdos do catálogo.
- **Detalhes:** visualização de informações sobre livros e editoras.
- **Favoritos:** acesso aos livros marcados como favoritos.
- **Login e cadastro:** interface de acesso e cadastro de usuários.
- **Cadastro de editoras:** gerenciamento das informações das editoras.
- **Visualização de dados:** apresentação de informações do projeto.

## 🛠️ Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Node.js
- npm
- JSON Server 0.17.4
- Bootstrap

## 📁 Estrutura do projeto

```text
LINKBOOK - entrega final/
├── db/
│   └── db.json
├── LinkBook/
│   └── public/
│       ├── index.html
│       ├── login.html
│       ├── favoritos.html
│       ├── details.html
│       ├── cadastro_editoras.html
│       ├── visualizacao.html
│       ├── arquivos CSS
│       ├── arquivos JavaScript
│       └── images/
├── package.json
└── README.md
```

- `db/db.json`: armazena os dados utilizados pela aplicação.
- `public/`: contém as páginas HTML, os arquivos CSS, JavaScript e as imagens.
- `package.json`: contém as configurações e dependências do projeto.

## 🚀 Como executar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado.
- npm instalado.
- Visual Studio Code ou outro editor de código.

### 1. Abra a pasta do projeto

Abra a pasta principal `LinkBook` no Visual Studio Code.

### 2. Instale as dependências

Abra o terminal na pasta principal e execute:

```bash
npm install
```

### 3. Configure o comando de inicialização

No arquivo `package.json`, confira se o script `start` está configurado assim:

```json
"start": "npx json-server --watch ./db/db.json --static ./public"
```

### 4. Inicie o servidor

No terminal, execute:

```bash
npm start
```

### 5. Acesse a aplicação

Abra o navegador e acesse:

http://localhost:3000

Mantenha o terminal aberto enquanto estiver utilizando a aplicação. Para encerrar o servidor, pressione `Ctrl + C`.

## ⚠️ Observações

- O projeto utiliza o JSON Server para disponibilizar os dados localmente.
- Os arquivos estáticos do site são servidos a partir da pasta `LinkBook/public`.
- Os caminhos das imagens devem corresponder à localização dos arquivos dentro dessa pasta.
- O projeto está configurado para execução local.

## 🎓 Projeto acadêmico

Projeto desenvolvido no contexto da disciplina de **Desenvolvimento de Interfaces Web**.
