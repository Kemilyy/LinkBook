const API_URL = "http://localhost:3000";

function getUsuario() {
    return JSON.parse(sessionStorage.getItem('usuarioCorrente') || '{}');
}

function estaLogado() {
    return !!getUsuario().login;
}

function logout() {
    sessionStorage.removeItem('usuarioCorrente');
    window.location.href = 'login.html';
}

function atualizarHeader() {
    const usuario = getUsuario();
    const textoEntrar = document.querySelector('.texto_entrar');
    const linkFavoritos = document.querySelector('.link-favoritos');
    const linkLogin = document.querySelector('.link-login');
    const linkLogout = document.querySelector('.link-logout');
    const usuarioEntrar = document.querySelector('.usuario_entrar');

    if (estaLogado()) {
        if (textoEntrar) textoEntrar.textContent = usuario.nome;
        if (linkFavoritos) linkFavoritos.style.display = '';
        if (linkLogout) linkLogout.style.display = '';
        if (linkLogin) linkLogin.style.display = 'none';
        if (usuarioEntrar) {
            usuarioEntrar.style.cursor = 'default';
            usuarioEntrar.onclick = null;
        }
    } else {
        if (linkFavoritos) linkFavoritos.style.display = 'none';
        if (linkLogout) linkLogout.style.display = 'none';
        if (linkLogin) linkLogin.style.display = '';
        if (usuarioEntrar) {
            usuarioEntrar.style.cursor = 'pointer';
            usuarioEntrar.onclick = () => window.location.href = 'login.html';
        }
    }
}

function obterIdDaURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function gerarCardsLivros(livros) {
    if (livros.length === 0)
        return "<p style='padding:10px'>Nenhum livro cadastrado para esta editora.</p>";

    return livros.map(livro => `
        <div class="card_livro">
            <img src="${livro.imagem}" alt="${livro.titulo}">
            <h4>${livro.titulo}</h4>
            <p>${livro.autor}</p>
        </div>
    `).join("");
}

function renderizarDetalhe(container, editora, livros) {
    container.innerHTML = `
        <div class="detalhe-editora">
            <div class="detalhe-imagem">
                <img src="${editora.imagem}" alt="${editora.nome}">
            </div>
            <div class="detalhe-infos">
                <ul class="lista-infos">
                    <h1><strong>${editora.nome}</strong></h1>
                    <li><strong>Fundação:</strong> ${editora.anoFundacao}</li>
                    <li><strong>Sede:</strong> ${editora.sede}</li>
                    <li><strong>Grupo Editorial:</strong> ${editora.grupoEditorial}</li>
                    <li><strong>Gênero Principal:</strong> ${editora.generoPrincipal}</li>
                    <li><strong>Principais Autores:</strong> ${editora.principaisAutores}</li>
                </ul>
                <p class="bio-editora">${editora.bio}</p>
            </div>
        </div>
        <div class="carrossel-wrapper">
            <button class="carrossel-btn esquerda" aria-label="Anterior">&#8249;</button>
            <div class="carrossel" id="carrossel-livros">
                ${gerarCardsLivros(livros)}
            </div>
            <button class="carrossel-btn direita" aria-label="Próximo">&#8250;</button>
        </div>
        <div style="text-align: center; padding: 15px;">
            <button class="botao-voltar" onclick="window.location.href='index.html'">
                ← Voltar para a tela inicial
            </button>
        </div>
    `;

    document.querySelector('.esquerda').addEventListener('click', () => moverCarrossel(-1));
    document.querySelector('.direita').addEventListener('click', () => moverCarrossel(1));
}

function moverCarrossel(direcao) {
    const carrossel = document.getElementById('carrossel-livros');
    const card = carrossel.querySelector('.card_livro');
    if (card) {
        const larguraCard = card.offsetWidth + 15;
        carrossel.scrollLeft += direcao * larguraCard;
    }
}

async function fetchEditora(id) {
    const resposta = await fetch(`${API_URL}/editoras/${id}`);
    if (!resposta.ok) throw new Error("Editora não encontrada.");
    return resposta.json();
}

async function fetchLivros(editoraId) {
    const resposta = await fetch(`${API_URL}/livros?editoraId=${editoraId}`);
    if (!resposta.ok) throw new Error("Erro ao buscar livros.");
    return resposta.json();
}

async function init() {
    atualizarHeader();

    const container = document.getElementById('detalhe-item');
    if (!container) return;

    const id = obterIdDaURL();

    if (!id) {
        container.innerHTML = `
            <div style="padding: 30px; text-align: center;">
                <p>⚠️ Nenhuma editora selecionada. <a href="index.html" style="color: white;">Voltar à página inicial.</a></p>
            </div>
        `;
        return;
    }

    try {
        const [editora, livros] = await Promise.all([
            fetchEditora(id),
            fetchLivros(id)
        ]);
        renderizarDetalhe(container, editora, livros);
    } catch (erro) {
        console.error("Erro ao carregar detalhes:", erro);
        container.innerHTML = `
            <div style="padding: 30px; text-align: center;">
                <p>Editora não encontrada ou servidor fora do ar.</p>
                <a href="index.html" style="color: white;">← Voltar à página inicial</a>
            </div>
        `;
    }
}

document.querySelector('.hamburguer')?.addEventListener('click', () => {
    document.querySelector('.links')?.classList.toggle('aberto');
});

window.addEventListener('DOMContentLoaded', init);