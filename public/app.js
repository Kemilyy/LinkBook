const dados = {
  "editoras": [
    {
      "id": 1,
      "nome": "Alt",
      "imagem": "../public/images/editoras/editoraalt.png",
      "anoFundacao": "2019",
      "sede": "Rio de Janeiro, RJ",
      "grupoEditorial": "Globo Livros (Grupo Globo)",
      "generoPrincipal": "Jovem Adulto, New Adult e Cultura Pop",
      "principaisAutores": "Alice Oseman, Lynn Painter, Chloe Gong",
      "bio": "Selo jovem e dinâmico da Globo Livros nascido para preencher o mercado de livros que viralizam nas redes sociais e conversam de perto com a Geração Z, focando em diversidade e representatividade."
    },

    {
      "id": 2,
      "nome": "Arqueiro",
      "imagem": "../public/images/editoras/editoraarqueiro.png",
      "anoFundacao": "2011",
      "sede": "Rio de Janeiro, RJ",
      "grupoEditorial": "Editora Sextante",
      "generoPrincipal": "Romances (comerciais, históricos, de época) e Thrillers.",
      "principaisAutores": "Ali Hazelwood, Julia Quinn, Harlan Coben, Nicholas Sparks, Lucinda Riley.",
      "bio": "Criada pela família Pereira (fundadores da Sextante) para dar uma identidade própria ao catálogo de ficção. Tornou-se um dos maiores fenômenos do país ao popularizar romances de época e best-sellers internacionais de drama e suspense."
    },

    {
      "id": 3,
      "nome": "Galera",
      "imagem": "../public/images/editoras/editoragalera.jpeg",
      "anoFundacao": "2007",
      "sede": "Rio de Janeiro, RJ",
      "grupoEditorial": "Grupo Editorial Record",
      "generoPrincipal": "Literatura Jovem Adulto (YA), Fantasia e Romances do BookTok",
      "principaisAutores": "Cassandra Clare, Sarah J. Maas, Colleen Hoover, Holly Black",
      "bio": "É o braço juvenil do Grupo Record, criado especificamente para atender um público jovem que pedia por mais livros de fantasia urbana, distopias e romances contemporâneos com pautas modernas."
    },

    {
      "id": 4,
      "nome": "Globo Livros",
      "imagem": "../public/images/editoras/editoraglobolivros.png", "anoFundacao": "1952",
      "sede": "São Paulo, SP",
      "grupoEditorial": "Grupo Globo",
      "generoPrincipal": "Biografias, Negócios, Não Ficção e Clássicos",
      "principaisAutores": "Machado de Assis, Padre Marcelo Rossi, Laurentino Gomes",
      "bio": "Herdeira da histórica Livraria do Globo de Porto Alegre, hoje integra o maior grupo de comunicação do país. Possui um catálogo vasto que une jornalismo investigativo e grandes nomes nacionais."
    },

    {
      "id": 5,
      "nome": "Intrínseca",
      "imagem": "../public/images/editoras/editoraintrinseca.png",
      "anoFundacao": "2003",
      "sede": "Rio de Janeiro, RJ",
      "grupoEditorial": "Independente",
      "generoPrincipal": "Ficção Geral, Biografias, Jovem Adulto e True Crime",
      "principaisAutores": "Rick Riordan, John Green, Stephenie Meyer, Neil Gaiman",
      "bio": "Fundada por Jorge Oakim com a proposta de publicar livros com forte apelo comercial e projetos gráficos impecáveis. É famosa por descobrir e emplacar grandes blockbusters literários mundiais no mercado brasileiro."
    },

    {
      "id": 6,
      "nome": "Seguinte",
      "imagem": "../public/images/editoras/editoraseguinte.png",
      "anoFundacao": "2012",
      "sede": "São Paulo, SP",
      "grupoEditorial": "Companhia das Letras",
      "generoPrincipal": "Literatura Jovem Adulto, Distopias e Histórias LGBTQIAPN+",
      "principaisAutores": "Kiera Cass, Casey McQuiston, Jenny Han, Vitor Martins",
      "bio": "Selo jovem da Companhia das Letras que foca em narrativas envolventes, discussões sociais relevantes e entretenimento de qualidade para adolescentes, além de forte apoio a autores nacionais."
    },

    {
      "id": 7,
      "nome": "Harper Collins",
      "imagem": "../public/images/editoras/harpercollins.png",
      "anoFundacao": "2015",
      "sede": "Rio de Janeiro, RJ",
      "grupoEditorial": "HarperCollins Publishers (Global)",
      "generoPrincipal": "Alta Fantasia, Suspense, Negócios e Clássicos",
      "principaisAutores": "J.R.R. Tolkien, Agatha Christie, C.S. Lewis, Karin Slaughter",
      "bio": "Braço brasileiro de uma das maiores e mais antigas editoras do mundo. Chegou com força ao país trazendo grandes marcas literárias exclusivas e um catálogo robusto de ficção e não ficção."
    },

    {
      "id": 8,
      "nome": "Planeta",
      "imagem": "../public/images/editoras/planeta.jpeg",
      "anoFundacao": "2003",
      "sede": "São Paulo, SP",
      "grupoEditorial": "Grupo Planeta (Espanha)",
      "generoPrincipal": "Desenvolvimento Pessoal, Autoajuda e Espiritualidade",
      "principaisAutores": "Augusto Cury, Mauricio de Sousa, Monja Coen, Pablo Neruda",
      "bio": "Filial brasileira do gigante conglomerado de mídia espanhol Grupo Planeta. É amplamente reconhecida por publicar grandes nomes da internet, jornalistas de destaque e livros focados em comportamento."
    }
  ],
  "livros": [
    {
      "id": 101,
      "editoraId": 6,
      "titulo": "A Seleção",
      "autor": "Kiera Cass",
      "imagem": "../public/images/livros/a seleção.jpg"
    },

    {
      "id": 102,
      "editoraId": 7,
      "titulo": "Morte no Nilo",
      "autor": "Agatha Christie",
      "imagem": "../public/images/livros/morte no nilo.jpg"
    },

    {
      "id": 103,
      "editoraId": 3,
      "titulo": "Um de Nós é o Próximo",
      "autor": "Karen M. McManus",
      "imagem": "../public/images/livros/um de nós é o próximo.jpg"
    },

    {
      "id": 104,
      "editoraId": 1,
      "titulo": "A Aposta Final",
      "autor": "Jennifer Lynn Barnes",
      "imagem": "../public/images/livros/a aposta final.jpg"
    },

    {
      "id": 105,
      "editoraId": 2,
      "titulo": "A Hipótese do Amor",
      "autor": "Ali Hazewoold",
      "imagem": "../public/images/livros/a hipotese do amor.webp"
    },

    {
      "id": 106,
      "editoraId": 5,
      "titulo": "Apostando no Amor",
      "autor": "Lynn Painter",
      "imagem": "../public/images/livros/apostando no amor.jpg"
    },

    {
      "id": 107,
      "editoraId": 8,
      "titulo": "Chama de Ferro",
      "autor": "Rebecca Yarros",
      "imagem": "../public/images/livros/chama de fero.webp"
    },

    {
      "id": 108,
      "editoraId": 4,
      "titulo": "E Não Sobrou Nenhum",
      "autor": "Agatha Christie",
      "imagem": "../public/images/livros/e nao sobrou nenhum.jpg"
    },

    {
      "id": 109,
      "editoraId": 1,
      "titulo": "Jogos de Herança",
      "autor": "Jennifer Lynn Barnes",
      "imagem": "../public/images/livros/jogos de heranca.jpg"
    },

    {
      "id": 110,
      "editoraId": 5,
      "titulo": "Melhor do Que Nos Filmes",
      "autor": "Lynn Painter",
      "imagem": "../public/images/livros/melhor do que nos filmes.webp"
    },

    {
      "id": 111,
      "editoraId": 1,
      "titulo": "O Herdeiro Perdido",
      "autor": "Jennifer Lynn Barnes",
      "imagem": "../public/images/livros/o herdeiro perdido.jpg"
    },

    {
      "id": 112,
      "editoraId": 8,
      "titulo": "Quarta Asa",
      "autor": "Rebecca Yarros",
      "imagem": "../public/images/livros/quarta_asa.webp"
    },

    {
      "id": 113,
      "editoraId": 2,
      "titulo": "Um amor Problemático de Verão",
      "autor": "Ali Hazewoold",
      "imagem": "../public/images/livros/um amor problematico.jpg"
    },

    {
      "id": 114,
      "editoraId": 1,
      "titulo": "Academia dos Casos Arquivados",
      "autor": "Jennifer Lynn Barnes",
      "imagem": "../public/images/livros/academiacasos.jpg"
    },

    {
      "id": 115,
      "editoraId": 1,
      "titulo": "Divinos Rivais",
      "autor": "Rebecca Ross",
      "imagem": "../public/images/livros/divinosrivais.jpg"
    },

    {
      "id": 116,
      "editoraId": 1,
      "titulo": "Em Rota de Colisão",
      "autor": "Lynn Painter",
      "imagem": "../public/images/livros/em rota de colisao.webp"
    },

    {
      "id": 117,
      "editoraId": 1,
      "titulo": "Assistente do Vilão",
      "autor": "Hannah Nicole Maehrer",
      "imagem": "../public/images/livros/assistentevilao.jpg"
    },

    {
      "id": 118,
      "editoraId": 1,
      "titulo": "Como Sobreviver à Realeza",
      "autor": "Rachel Hawkins",
      "imagem": "../public/images/livros/comosobreviverarealeza.jpg"
    },

    {
      "id": 119,
      "editoraId": 1,
      "titulo": "Beijos e Croissants",
      "autor": "Anne-Sophie Jouhanneau",
      "imagem": "../public/images/livros/beijoscroissants.jpg"
    },

    {
      "id": 120,
      "editoraId": 1,
      "titulo": "Promessas Cruéis",
      "autor": "Rebecca Ross",
      "imagem": "../public/images/livros/promessascrueis.jpg"
    },

    { "id": 121, 
    "editoraId": 2, 
    "titulo": "Uma Farsa de Amor na Espanha", 
    "autor": "Elena Armas", 
    "imagem": "../public/images/livros/umafarcadeamornaespanha.jpg" },
  
    { "id": 122, 
    "editoraId": 2, 
    "titulo": "Sem Coração", 
    "autor": "Marissa Meyer", 
    "imagem": "../public/images/livros/semcoracao.png" },
  
    { "id": 123, 
    "editoraId": 2, 
    "titulo": "Caçador Sem Coração", 
    "autor": "Kristen Ciccarelli", 
    "imagem": "../public/images/livros/cacadorsemcoracao.jpg" },
  
    { "id": 124, 
    "editoraId": 2, 
    "titulo": "Um Perfeito Cavalheiro", 
    "autor": "Julia Quinn", 
    "imagem": "../public/images/livros/bridgerton.jpg"}, 
  ]
};

function renderizarHome(container) {
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
    container.innerHTML = html;
}

function gerarCardsLivros(livros) {
    if (livros.length === 0) 
      return "<p>Nenhum livro cadastrado.</p>";
    else
      return livros.map(livro => `
          <div class="card_livro text-center">
              <img src="${livro.imagem}" alt="${livro.titulo}" style="max-width: 100%;">
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
            <button class="carrossel-btn esquerda">&#8249;</button>
            <div class="carrossel" id="carrossel-livros">
                ${gerarCardsLivros(livros)}
            </div>
            <button class="carrossel-btn direita">&#8250;</button>
        </div>
        <div style="text-align: center; padding: 15px;">
            <button class="botao-voltar" onclick="window.location.href='index.html'">Voltar para a tela inicial</button>
        </div>
    `;

    document.querySelector('.esquerda').addEventListener('click', () => moverCarrossel(-1));
    document.querySelector('.direita').addEventListener('click', () => moverCarrossel(1));
}

window.onload = () => {
    const containerHome = document.getElementById('lista-editoras');
    const containerDetalhe = document.getElementById('detalhe-item');

    if (containerHome) {
        renderizarHome(containerHome);
    } else if (containerDetalhe) {
        const params = new URLSearchParams(window.location.search);
        const idEd = params.get('id');
        const editora = dados.editoras.find(e => e.id == idEd);
        const livrosFiltrados = dados.livros.filter(l => l.editoraId == idEd);

        if (editora) renderizarDetalhe(containerDetalhe, editora, livrosFiltrados);
    }
};

document.querySelector('.hamburguer').addEventListener('click', () => {
  document.querySelector('.links').classList.toggle('aberto');
});

function moverCarrossel(direcao) {
    const carrossel = document.getElementById('carrossel-livros');
    const larguraCard = carrossel.querySelector('.card_livro').offsetWidth + 15;
    carrossel.scrollLeft += direcao * larguraCard + 1;
}