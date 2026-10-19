const API_URL = "http://localhost:3000";

function getUsuario() {
    return JSON.parse(sessionStorage.getItem('usuarioCorrente') || '{}');
}

function estaLogado() {
    return !!getUsuario().login;
}

function eAdmin() {
    return getUsuario().admin === true;
}

function logout() {
    sessionStorage.removeItem('usuarioCorrente');
    window.location.href = 'login.html';
}

function atualizarHeader() {
    const usuario = getUsuario();
    const textoEntrar = document.querySelector('.texto_entrar');
    const linkFavoritos = document.querySelector('.link-favoritos');
    const linkCadastro = document.querySelector('.link-cadastro');
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
        if (linkCadastro) linkCadastro.style.display = eAdmin() ? '' : 'none';
    } else {
        if (linkFavoritos) linkFavoritos.style.display = 'none';
        if (linkCadastro) linkCadastro.style.display = 'none';
        if (linkLogout) linkLogout.style.display = 'none';
        if (linkLogin) linkLogin.style.display = '';
        if (usuarioEntrar) {
            usuarioEntrar.style.cursor = 'pointer';
            usuarioEntrar.onclick = () => window.location.href = 'login.html';
        }
    }
}

function verificarAcesso() {
    const areaAdmin = document.getElementById('area-admin');
    const acessoNeg = document.getElementById('acesso-negado');

    if (eAdmin()) {
        if (areaAdmin) areaAdmin.style.display = '';
        if (acessoNeg) acessoNeg.style.display = 'none';
        carregarEditoras();
    } else {
        if (areaAdmin) areaAdmin.style.display = 'none';
        if (acessoNeg) acessoNeg.style.display = '';
    }
}

async function carregarEditoras() {
    try {
        const resp = await fetch(`${API_URL}/editoras`);
        const editoras = await resp.json();
        renderizarLista(editoras);
    } catch (e) {
        console.error('Erro ao carregar editoras:', e);
        mostrarMensagem('Erro ao carregar editoras. Verifique o JSON Server.', 'erro');
    }
}

function renderizarLista(editoras) {
    const container = document.getElementById('lista-editoras');
    if (!container) return;

    if (editoras.length === 0) {
        container.innerHTML = '<p class="sem-itens">Nenhuma editora cadastrada ainda.</p>';
        return;
    }

    container.innerHTML = editoras.map(ed => `
        <div class="card-editora">
            <img src="${ed.imagem}" alt="${ed.nome}" onerror="this.src='../public/images/icones/logo.png'">
            <div class="card-info">
                <h3>${ed.nome}</h3>
                <p><strong>Fundação:</strong> ${ed.anoFundacao}</p>
                <p><strong>Sede:</strong> ${ed.sede}</p>
                <p><strong>Gênero:</strong> ${ed.generoPrincipal || '—'}</p>
                <p class="card-bio">${ed.bio}</p>
            </div>
            <div class="card-acoes">
                <button class="btn-editar" onclick="prepararEdicao('${ed.id}')">Editar</button>
                <button class="btn-excluir" onclick="excluirEditora('${ed.id}', '${ed.nome.replace(/'/g, "\\'")}')">Excluir</button>
            </div>
        </div>
    `).join('');
}

async function salvarEditora() {
    const id = document.getElementById('editora-id').value;
    const nome = document.getElementById('nome').value.trim();
    const imagem = document.getElementById('imagem').value.trim();
    const anoFundacao = document.getElementById('anoFundacao').value.trim();
    const sede = document.getElementById('sede').value.trim();
    const grupoEditorial = document.getElementById('grupoEditorial').value.trim();
    const generoPrincipal = document.getElementById('generoPrincipal').value.trim();
    const principaisAutores = document.getElementById('principaisAutores').value.trim();
    const bio = document.getElementById('bio').value.trim();

    if (!nome || !imagem || !anoFundacao || !sede || !bio) {
        mostrarMensagem('Preencha todos os campos obrigatórios (*).', 'erro');
        return;
    }

    const editora = { nome, imagem, anoFundacao, sede, grupoEditorial, generoPrincipal, principaisAutores, bio };

    try {
        let resp;
        if (id) {
            resp = await fetch(`${API_URL}/editoras/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editora)
            });
        } else {
            resp = await fetch(`${API_URL}/editoras`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editora)
            });
        }

        if (resp.ok) {
            mostrarMensagem(id ? 'Editora atualizada com sucesso!' : 'Editora cadastrada com sucesso!', 'sucesso');
            limparFormulario();
            carregarEditoras();
        } else {
            mostrarMensagem('Erro ao salvar. Verifique o JSON Server.', 'erro');
        }
    } catch (e) {
        console.error(e);
        mostrarMensagem('Não foi possível conectar ao servidor.', 'erro');
    }
}

async function prepararEdicao(id) {
    try {
        const resp = await fetch(`${API_URL}/editoras/${id}`);
        const ed = await resp.json();

        document.getElementById('editora-id').value = ed.id;
        document.getElementById('nome').value = ed.nome;
        document.getElementById('imagem').value = ed.imagem;
        document.getElementById('anoFundacao').value = ed.anoFundacao;
        document.getElementById('sede').value = ed.sede;
        document.getElementById('grupoEditorial').value = ed.grupoEditorial;
        document.getElementById('generoPrincipal').value = ed.generoPrincipal;
        document.getElementById('principaisAutores').value = ed.principaisAutores;
        document.getElementById('bio').value = ed.bio;

        document.getElementById('titulo-form').textContent = 'Editar Editora';
        document.getElementById('btn-salvar').textContent = 'Salvar Alterações';
        document.getElementById('btn-cancelar').style.display = '';

        document.querySelector('.form-cadastro').scrollIntoView({ behavior: 'smooth' });
    } catch (e) {
        console.error(e);
        mostrarMensagem('Erro ao carregar editora para edição.', 'erro');
    }
}

function cancelarEdicao() {
    limparFormulario();
}

async function excluirEditora(id, nome) {
    if (!confirm(`Tem certeza que deseja excluir a editora "${nome}"?`)) return;

    try {
        const resp = await fetch(`${API_URL}/editoras/${id}`, { method: 'DELETE' });

        if (resp.ok) {
            mostrarMensagem(`Editora "${nome}" excluída com sucesso!`, 'sucesso');
            carregarEditoras();
        } else {
            mostrarMensagem('Erro ao excluir editora.', 'erro');
        }
    } catch (e) {
        console.error(e);
        mostrarMensagem('Não foi possível conectar ao servidor.', 'erro');
    }
}

function limparFormulario() {
    ['editora-id', 'nome', 'imagem', 'anoFundacao', 'sede',
        'grupoEditorial', 'generoPrincipal', 'principaisAutores', 'bio']
        .forEach(id => document.getElementById(id).value = '');

    document.getElementById('titulo-form').textContent = 'Cadastrar Nova Editora';
    document.getElementById('btn-salvar').textContent = 'Cadastrar Editora';
    document.getElementById('btn-cancelar').style.display = 'none';
    document.getElementById('mensagem-sucesso').innerHTML = '';
    document.getElementById('mensagem-sucesso').className = '';
}

function mostrarMensagem(texto, tipo) {
    const el = document.getElementById('mensagem-sucesso');
    el.textContent = texto;
    el.className = tipo === 'sucesso' ? 'msg-sucesso' : 'msg-erro';
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 4000);
}

document.querySelector('.hamburguer')?.addEventListener('click', () => {
    document.querySelector('.links')?.classList.toggle('aberto');
});

window.addEventListener('DOMContentLoaded', () => {
    atualizarHeader();
    verificarAcesso();
});