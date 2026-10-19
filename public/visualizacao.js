const API_URL = "http://localhost:3000";

const CORES = [
    'rgba(160, 80, 220, 0.85)',
    'rgba(120, 40, 180, 0.85)',
    'rgba(200, 120, 255, 0.85)',
    'rgba(90,  20, 150, 0.85)',
    'rgba(180, 100, 240, 0.85)',
    'rgba(140, 60,  200, 0.85)',
    'rgba(220, 150, 255, 0.85)',
    'rgba(100, 30,  160, 0.85)',
    'rgba(170, 90,  230, 0.85)',
    'rgba(130, 50,  190, 0.85)',
];

async function fetchDados() {
    const [resEditoras, resLivros] = await Promise.all([
        fetch(`${API_URL}/editoras`),
        fetch(`${API_URL}/livros`)
    ]);
    if (!resEditoras.ok || !resLivros.ok) throw new Error("Erro ao buscar dados.");
    return {
        editoras: await resEditoras.json(),
        livros: await resLivros.json()
    };
}

function criarGraficoLivrosPorEditora(editoras, livros) {
    const contagem = {};
    editoras.forEach(ed => contagem[ed.id] = 0);
    livros.forEach(liv => {
        if (contagem[liv.editoraId] !== undefined)
            contagem[liv.editoraId]++;
    });

    const labels = editoras.map(ed => ed.nome);
    const dados = editoras.map(ed => contagem[ed.id]);

    const ctx = document.getElementById('grafico-livros').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Quantidade de Livros',
                data: dados,
                backgroundColor: CORES,
                borderColor: CORES.map(c => c.replace('0.85', '1')),
                borderWidth: 1,
                borderRadius: 8,
            }]
        },
        options: {
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: ctx => ` ${ctx.parsed.y} livro(s)`
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: 'white', font: { size: 11 } },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: 'white', stepSize: 1 },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                }
            }
        }
    });
}

function renderizarGraficos(editoras, livros) {
    document.getElementById('conteudo-graficos').innerHTML = `
        <div class="row g-4">
            <div class="col-12">
                <div class="grafico-card">
                    <h3>Quantidade de Livros por Editora</h3>
                    <canvas id="grafico-livros" width="1200" height="400"></canvas>
                </div>
            </div>
        </div>
    `;

    criarGraficoLivrosPorEditora(editoras, livros);
}

async function init() {
    try {
        const { editoras, livros } = await fetchDados();
        renderizarGraficos(editoras, livros);
    } catch (erro) {
        console.error(erro);
        document.getElementById('conteudo-graficos').innerHTML = `
            <div class="erro">
                Não foi possível carregar os dados. Verifique se o JSON Server está rodando.<br>
                <small>json-server --watch db.json --port 3000</small>
            </div>
        `;
    }
}

document.querySelector('.hamburguer')?.addEventListener('click', () => {
    document.querySelector('.links')?.classList.toggle('aberto');
});

window.addEventListener('DOMContentLoaded', init);