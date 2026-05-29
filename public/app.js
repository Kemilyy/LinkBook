const dados = {
  "editoras": [
    { "id": 1, "nome": "Alt", "imagem": "../public/images/editoras/editoraalt.png", "bio": "A Alt é um selo da Editora Globo focado em literatura jovem e contemporânea." },
    { "id": 2, "nome": "Arqueiro", "imagem": "../public/images/editoras/editoraarqueiro.png", "bio": "Conhecida por seus grandes sucessos de ficção, romances históricos e suspense." },
    { "id": 3, "nome": "Galera", "imagem": "../public/images/editoras/editoragalera.jpeg", "bio": "O maior selo de literatura YA (Young Adult) do Brasil, pertencente ao Grupo Editorial Record." },
    { "id": 4, "nome": "Globo Livros", "imagem": "../public/images/editoras/editoraglobolivros.png", "bio": "Publica obras de grandes autores nacionais e internacionais em diversos gêneros." },
    { "id": 5, "nome": "Intrínseca", "imagem": "../public/images/editoras/editoraintrinseca.png", "bio": "Famosa por trazer best-sellers mundiais e livros de não-ficção de grande impacto." },
    { "id": 6, "nome": "Seguinte", "imagem": "../public/images/editoras/editoraseguinte.png", "bio": "Selo jovem da Companhia das Letras, focado em histórias inovadoras e representatividade." },
    { "id": 7, "nome": "Harper Collins", "imagem": "../public/images/editoras/harpercollins.png", "bio": "Uma das maiores editoras do mundo, casa de autores clássicos como J.R.R. Tolkien, Agatha Christie e C.S. Lewis." },
    { "id": 8, "nome": "Planeta", "imagem": "../public/images/editoras/planeta.jpeg", "bio": "Braço nacional de um dos maiores grupos editoriais do mundo, famosa por selos fortes como Crítica, Paidós e Tusquets." }
  ],
  "livros": [
    { "id": 101, "editoraId": 6, "titulo": "A Seleção", "autor": "Kiera Cass", "imagem": "../public/images/livros/a seleção.jpg" },
    { "id": 102, "editoraId": 7, "titulo": "Morte no Nilo", "autor": "Agatha Christie", "imagem": "../public/images/livros/morte no nilo.jpg" },
    { "id": 103, "editoraId": 3, "titulo": "Um de Nós é o Próximo", "autor": "Karen M. McManus", "imagem": "../public/images/livros/um de nós é o próximo.jpg" },
    { "id": 104, "editoraId": 1, "titulo": "A Aposta Final", "autor": "Jennifer Lynn Barnes", "imagem": "../public/images/livros/a aposta final.jpg" },
    { "id": 105, "editoraId": 2, "titulo": "A Hipótese do Amor", "autor": "Ali Hazewoold", "imagem": "../public/images/livros/a hipotese do amor.webp" },
    { "id": 106, "editoraId": 2, "titulo": "Apostando no Amor", "autor": "Ali Hazewoold", "imagem": "../public/images/livros/apostando no amor.jpg" },
    { "id": 107, "editoraId": 8, "titulo": "Chama de Ferro", "autor": "Rebecca Yarros", "imagem": "../public/images/livros/chama de fero.webp" },
    { "id": 108, "editoraId": 4, "titulo": "E Não Sobrou Nenhum", "autor": "Agatha Christie", "imagem": "../public/images/livros/e nao sobrou nenhum.jpg" },
    { "id": 109, "editoraId": 1, "titulo": "Jogos de Herança", "autor": "Jennifer Lynn Barnes", "imagem": "../public/images/livros/jogos de heranca.jpg" },
    { "id": 110, "editoraId": 5, "titulo": "Melhor do Que Nos Filmes", "autor": "Lynn Painter", "imagem": "../public/images/livros/melhor do que nos filmes.webp" },
    { "id": 111, "editoraId": 1, "titulo": "O Herdeiro Perdido", "autor": "Jennifer Lynn Barnes", "imagem": "../public/images/livros/o herdeiro perdido.jpg" },
    { "id": 112, "editoraId": 8, "titulo": "Quarta Asa", "autor": "Rebecca Yarros", "imagem": "../public/images/livros/quarta_asa.webp" },
    { "id": 113, "editoraId": 2, "titulo": "Um amor Problemático de Verão", "autor": "Ali Hazewoold", "imagem": "../public/images/livros/um amor problematico.jpg" },
  ]
};

window.onload = () => {
  const containerHome = document.getElementById('lista-editoras');
  const containerDetalhe = document.getElementById('detalhe-item');

  if (containerHome) {
    let html = "";
    dados.editoras.forEach(ed => {
      html += `
                <article class="card_livro">
                    <a href="detalhes.html?id=${ed.id}" style="text-decoration:none">
                        <div class="capa">
                            <img src="${ed.imagem}" alt="${ed.nome}">
                        </div>
                        <div class="informações">
                            <h4>${ed.nome}</h4>
                        </div>
                    </a>
                </article>
            `;
    });
    containerHome.innerHTML = html;
  }
  else if (containerDetalhe) {
    const params = new URLSearchParams(window.location.search);
    const idEd = params.get('id');
    const editora = dados.editoras.find(e => e.id == idEd);
    const livrosFiltrados = dados.livros.filter(l => l.editoraId == idEd);

    if (editora) {
      let cardsLivros = "";
      livrosFiltrados.forEach(livro => {
        cardsLivros += `
                    <div class="col-12 col-md-4 mb-4"> <div class="card_livro text-center">
                    <img src="${livro.imagem}" alt="${livro.titulo}" style="max-width: 100%;">
                    <h4>${livro.titulo}</h4>
                    <p>${livro.autor}</p>
        </div>
    </div>
                `;
      });

      containerDetalhe.innerHTML = `
                <div class="text-center mb-5" style="color:white;">
                    <img src="${editora.imagem}" style="height:100px; border-radius:10px;">
                    <h1 class="mt-3">${editora.nome}</h1>
                    <p>${editora.bio}</p>
                </div>
                <div class="livros">
                    ${cardsLivros || "<p>Nenhum livro cadastrado.</p>"}
                </div>
                <div class="text-center mt-5">
                    <a href="index.html" style="color:white; text-decoration:underline;">Voltar</a>
                </div>
            `;
    }
  }
};