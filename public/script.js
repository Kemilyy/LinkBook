const API_URL = "http://localhost:3000";

function getUsuario() {
    return JSON.parse(sessionStorage.getItem('usuarioCorrente') || '{}');
}

function estaLogado() {
    return !!getUsuario().login;
}

function getFavoritos() {
    const usuario = getUsuario();
    if (!usuario.login) return [];
    const chave = `favoritos_${usuario.login}`;
    return JSON.parse(localStorage.getItem(chave) || '[]');
}

function toggleFavorito(editoraId) {
    const usuario = getUsuario();
    if (!usuario.login) {
        alert('Faça login para favoritar editoras.');
        return false;
    }
    const chave = `favoritos_${usuario.login}`;
    let favoritos = getFavoritos();
    const id = Number(editoraId);
    if (favoritos.map(Number).includes(id)) {
        favoritos = favoritos.filter(f => Number(f) !== id);
    } else {
        favoritos.push(id);
    }
    localStorage.setItem(chave, JSON.stringify(favoritos));
    return true;
}

function ehFavorito(editoraId) {
    const favoritos = getFavoritos();
    return favoritos.includes(Number(editoraId)) || favoritos.includes(String(editoraId));
}

function atualizarHeader() {
    const usuario = getUsuario();
    const textoEntrar = document.querySelector('.texto_entrar');
    const icone = document.querySelector('.icone_boneco img');
    const linkFavoritos = document.querySelector('.link-favoritos');
    const linkLogin = document.querySelector('.link-login');
    const linkLogout = document.querySelector('.link-logout');

    if (estaLogado()) {
        // Troca "Entrar" pelo nome do usuário
        if (textoEntrar) textoEntrar.textContent = usuario.nome;

        // Remove o evento de redirecionar para login ao clicar no ícone
        const usuarioEntrar = document.querySelector('.usuario_entrar');
        if (usuarioEntrar) {
            usuarioEntrar.style.cursor = 'default';
            usuarioEntrar.onclick = null;
        }

        // Mostra Favoritos e Logout, esconde Login
        if (linkFavoritos) linkFavoritos.style.display = '';
        if (linkLogout) linkLogout.style.display = '';
        if (linkLogin) linkLogin.style.display = 'none';
    } else {
        // Mostra Login, esconde Favoritos e Logout
        if (linkFavoritos) linkFavoritos.style.display = 'none';
        if (linkLogout) linkLogout.style.display = 'none';
        if (linkLogin) linkLogin.style.display = '';

        const usuarioEntrar = document.querySelector('.usuario_entrar');
        if (usuarioEntrar) {
            usuarioEntrar.style.cursor = 'pointer';
            usuarioEntrar.onclick = () => window.location.href = 'login.html';
        }
    }
}

function logout() {
    sessionStorage.removeItem('usuarioCorrente');
    window.location.href = 'login.html';
}

async function fetchItems() {
    const resposta = await fetch(`${API_URL}/editoras`);
    if (!resposta.ok) throw new Error("Erro ao buscar editoras.");
    return resposta.json();
}

function createCard(editora) {
    const article = document.createElement('article');
    article.classList.add('card_livro');

    const iconeCheio = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="red" viewBox="0 0 16 16"><path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/></svg>`;

    const iconeVazio = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 16 16"><path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.885.838-3.362.314-4.385C13.486.878 10.4.281 8.717 2.011z"/></svg>`;

    const favorito = ehFavorito(editora.id);
    const iconeCoracao = estaLogado()
        ? `<button class="btn-favorito" data-id="${editora.id}" title="Favoritar">${favorito ? iconeCheio : iconeVazio}</button>`: '';

    article.innerHTML = `
        ${iconeCoracao}
        <a href="details.html?id=${editora.id}" style="text-decoration:none">
            <div class="capa">
                <img src="${editora.imagem}" alt="${editora.nome}">
            </div>
            <div class="informações">
                <h4>${editora.nome}</h4>
            </div>
        </a>
    `;

    const btnFav = article.querySelector('.btn-favorito');
    if (btnFav) {
        btnFav.addEventListener('click', (e) => {
            e.preventDefault();
            const id = parseInt(btnFav.dataset.id);
            toggleFavorito(id);
            btnFav.innerHTML = ehFavorito(id) ? iconeCheio : iconeVazio;
        });
    }

    return article;
}

function renderCards(editoras) {
    const container = document.getElementById('lista-editoras');
    container.innerHTML = "";
    editoras.forEach(ed => container.appendChild(createCard(ed)));
}

function filtrarEditoras() {
    const busca = document.querySelector('.busca_input');
    if (!busca) return;

    busca.addEventListener('input', () => {
        const termo = busca.value.toLowerCase();
        document.querySelectorAll('.card_livro').forEach(card => {
            const nome = card.querySelector('h4')?.textContent.toLowerCase() || '';
            card.style.display = nome.includes(termo) ? 'flex' : 'none';
        });
    });
}

document.querySelector('.hamburguer')?.addEventListener('click', () => {
    document.querySelector('.links')?.classList.toggle('aberto');
});

async function init() {
    atualizarHeader();

    const container = document.getElementById('lista-editoras');
    if (!container) return;

    try {
        const editoras = await fetchItems();
        renderCards(editoras);
        filtrarEditoras();
    } catch (erro) {
        console.error("Erro ao carregar editoras:", erro);
        container.innerHTML = "<p style='padding:20px'>❌ Erro ao carregar editoras. O servidor está rodando?</p>";
    }
}

window.addEventListener('DOMContentLoaded', init);