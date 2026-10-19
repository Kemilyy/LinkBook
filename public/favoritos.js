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
    const usuario       = getUsuario();
    const textoEntrar   = document.querySelector('.texto_entrar');
    const linkFavoritos = document.querySelector('.link-favoritos');
    const linkLogin     = document.querySelector('.link-login');
    const linkLogout    = document.querySelector('.link-logout');
    const usuarioEntrar = document.querySelector('.usuario_entrar');

    if (estaLogado()) {
        if (textoEntrar)   textoEntrar.textContent = usuario.nome;
        if (linkFavoritos) linkFavoritos.style.display = '';
        if (linkLogout)    linkLogout.style.display = '';
        if (linkLogin)     linkLogin.style.display = 'none';
        if (usuarioEntrar) {
            usuarioEntrar.style.cursor = 'default';
            usuarioEntrar.onclick = null;
        }
    } else {
        if (linkFavoritos) linkFavoritos.style.display = 'none';
        if (linkLogout)    linkLogout.style.display = 'none';
        if (linkLogin)     linkLogin.style.display = '';
        if (usuarioEntrar) {
            usuarioEntrar.style.cursor = 'pointer';
            usuarioEntrar.onclick = () => window.location.href = 'login.html';
        }
    }
}

function getFavoritos() {
    const usuario = getUsuario();
    if (!usuario.login) return [];
    return JSON.parse(localStorage.getItem(`favoritos_${usuario.login}`) || '[]');
}

function removerFavorito(editoraId) {
    const usuario = getUsuario();
    const chave = `favoritos_${usuario.login}`;
    let favoritos = getFavoritos().filter(id => id !== editoraId && id !== String(editoraId) && id !== Number(editoraId));
    localStorage.setItem(chave, JSON.stringify(favoritos));
}

const iconeCheio = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="red" viewBox="0 0 16 16">
  <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
</svg>`;

function createCard(editora) {
    const article = document.createElement('article');
    article.classList.add('card_livro');
    article.id = `card-${editora.id}`;

    article.innerHTML = `
        <button class="btn-favorito" data-id="${editora.id}" title="Remover dos favoritos">
            ${iconeCheio}
        </button>
        <a href="details.html?id=${editora.id}" style="text-decoration:none">
            <div class="capa">
                <img src="${editora.imagem}" alt="${editora.nome}">
            </div>
            <div class="informações">
                <h4>${editora.nome}</h4>
            </div>
        </a>
    `;

    article.querySelector('.btn-favorito').addEventListener('click', (e) => {
        e.preventDefault();
        const id = parseInt(e.currentTarget.dataset.id);
        removerFavorito(id);
        document.getElementById(`card-${id}`)?.remove();

        const container = document.getElementById('lista-favoritos');
        if (container.children.length === 0) mostrarVazio(container);
    });

    return article;
}

function mostrarVazio(container) {
    container.innerHTML = `
        <div class="vazio-msg">
            <p>Você ainda não tem editoras favoritas.</p>
            <a href="index.html">← Voltar para a página inicial e favoritar editoras</a>
        </div>
    `;
}

async function init() {
    atualizarHeader();

    const container = document.getElementById('lista-favoritos');

    if (!estaLogado()) {
        container.innerHTML = `
            <div class="vazio-msg">
                <p>Faça login para ver seus favoritos.</p>
                <a href="login.html">→ Ir para o login</a>
            </div>
        `;
        return;
    }

    const idsFavoritos = getFavoritos();

    if (idsFavoritos.length === 0) {
        mostrarVazio(container);
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/editoras`);
        const editoras = await resposta.json();
        const favoritas = editoras.filter(ed =>
            idsFavoritos.includes(Number(ed.id)) || idsFavoritos.includes(String(ed.id))
        );

        if (favoritas.length === 0) {
            mostrarVazio(container);
            return;
        }

        favoritas.forEach(ed => container.appendChild(createCard(ed)));
    } catch (erro) {
        console.error(erro);
        container.innerHTML = `<div class="vazio-msg">Erro ao carregar favoritos. O servidor está rodando?</div>`;
    }
}

document.querySelector('.hamburguer')?.addEventListener('click', () => {
    document.querySelector('.links')?.classList.toggle('aberto');
});

window.addEventListener('DOMContentLoaded', init);