const areaTables = document.getElementById('areaDeTables');
const templateBoxTransparente = document.getElementById('boxTransparente');

const pastas = [];
let idBox = 0;

areaTables.addEventListener('click', () => {
    const clone = templateBoxTransparente.content.firstElementChild.cloneNode(true);

    ladoDir.appendChild(clone);
    configurarArrasto(clone);


    clone.addEventListener('click', (event) => {
        if (event.target.closest(
            '.miniaturasPasta, .miniaturaPasta, .armazenamentoPasta'
        )) return;

        clone.classList.toggle('aberta');
    });
    pastas.push(clone);
});


function pastaSobreposta(box) {
    const rect = box.getBoundingClientRect();

    return pastas.find((pasta) => {
        const limite = pasta.getBoundingClientRect();

        return (
            rect.left < limite.right &&
            rect.right > limite.left &&
            rect.top < limite.bottom &&
            rect.bottom > limite.top
        );
    }) || null;
}


document.addEventListener('pointerup', (e) => {
    const box = e.target.closest('.newBoxTable');

    if (!box) return;
    if (box.closest('.armazenamentoPasta')) return;

    if (!box.dataset.id) {
        box.dataset.id = String(++idBox);
    }

    const pasta = pastaSobreposta(box);
    if (!pasta) return;

    const armazenamento = pasta.querySelector('.armazenamentoPasta');
    if (!armazenamento) return;

    armazenamento.appendChild(box);

    styleMiniatura(box, pasta);
});


function styleMiniatura(box, pasta) {
    const containerMiniaturas = pasta.querySelector('.miniaturasPasta');

    if (!containerMiniaturas) return;
    const existente = containerMiniaturas.querySelector(
        `[data-box-id="${box.dataset.id}"]`
    );

    if (existente) return;

    const botoesMiniatura = document.createElement('div')
    botoesMiniatura.classList.add('botoesMiniatura')

    const miniatura = document.createElement('button')
    miniatura.type = 'button';
    miniatura.classList.add('miniaturaPasta');
    miniatura.dataset.boxId = box.dataset.id;

    const titulo = box.querySelector(
        '.inputDoTituloNovaBox, .inputDoTituloDaBox'
    );
    miniatura.textContent =
        '🗂️ ' + (titulo?.value.trim() || 'Box guardada');


    const botaoremoverminiatura = document.createElement('button')
    botaoremoverminiatura.type = 'button'
    botaoremoverminiatura.classList.add('botaoRemoverMiniatura')
    botaoremoverminiatura.textContent = 'x'
    botaoremoverminiatura.addEventListener('click', (e) => {
        e.stopPropagation();
        box.classList.remove('expandida');
        box.remove();
        botoesMiniatura.remove();
    });


    botoesMiniatura.append(miniatura, botaoremoverminiatura)
    containerMiniaturas.appendChild(botoesMiniatura);
}


function miniaturaClicada() {
    document.addEventListener('click', (e) => {
        const miniatura = e.target.closest('.miniaturaPasta');

        if (!miniatura) return;

        const pasta = pastas.find((p) => p.contains(miniatura));

        if (!pasta) return;

        const idClicado = miniatura.dataset.boxId;

        pasta.querySelectorAll('.armazenamentoPasta .newBoxTable')
            .forEach((box) => {
                const mesma = box.dataset.id === idClicado;
                const jaExpandida = box.classList.contains('expandida');

                box.classList.toggle(
                    'expandida',
                    mesma && !jaExpandida
                );
            });
    });
}

miniaturaClicada();


function configurarArrastoExpandida(box) {
    let arrasto = null;

    box.addEventListener('pointerdown', (event) => {
        if (!box.classList.contains('expandida')) return;
        if (event.button !== 0) return;
        if (event.target.closest('input, textarea, button, select, a')) {
            return;
        }

        const pasta = box.closest('.SandBox');
        if (!pasta) return;

        const rectPasta = pasta.getBoundingClientRect();
        const rectBox = box.getBoundingClientRect();

        arrasto = {
            xInicial: event.clientX,
            yInicial: event.clientY,

            esquerdaInicial:
                rectBox.left - rectPasta.left - pasta.clientLeft,

            topoInicial:
                rectBox.top - rectPasta.top - pasta.clientTop,

            pointerId: event.pointerId
        };
        box.style.left = `${arrasto.esquerdaInicial}px`;
        box.style.top = `${arrasto.topoInicial}px`;

        event.stopPropagation();
        event.preventDefault();

        box.setPointerCapture(event.pointerId);
    });

    box.addEventListener('pointermove', (event) => {
        if (!arrasto) return;
        if (event.pointerId !== arrasto.pointerId) return;

        const deslocamentoX = event.clientX - arrasto.xInicial;
        const deslocamentoY = event.clientY - arrasto.yInicial;

        box.style.left =
            `${arrasto.esquerdaInicial + deslocamentoX}px`;

        box.style.top =
            `${arrasto.topoInicial + deslocamentoY}px`;
    });

    function pararArrasto(event) {
        if (!arrasto) return;
        if (event.pointerId !== arrasto.pointerId) return;

        arrasto = null;
    }

    box.addEventListener('pointerup', pararArrasto);
    box.addEventListener('pointercancel', pararArrasto);
}

function botaoRemoverMiniatura() {

    document.addEventListener('click', (e) => {
        e.target.closest('.buttonRemover')

        e.remove()
    })
}
botaoRemoverMiniatura();


function removerForButtonBox() {
    document.addEventListener('click', (e) => {
        const botao = e.target.closest('.buttonRemoverNewBox');
        if (!botao) return;

        const box = botao.closest('.newBoxTable');
        if (!box || !box.dataset.id) return;

        const miniatura = document.querySelector(
            `[data-box-id="${box.dataset.id}"]`
        );
        if (!miniatura) return;

        (miniatura.closest('.botoesMiniatura, .estiloMiniaturaPasta') || miniatura).remove();
    }, true);}
removerForButtonBox()


function redimensionarBoxExpandida(box) {
    let redimensionamento = false;
    let direcao = null;

    const margem = 10;
    const larguraMinima = 180;
    const alturaMinima = 120;

    let posicaoX = 0;
    let posicaoY = 0;

    let larguraInicial = 0;
    let alturaInicial = 0;

    let esquerdaInicial = 0;
    let topoInicial = 0;

    // Identifica em qual borda o mouse está.
    function identificarBorda(e) {
        const rect = box.getBoundingClientRect();

        const esquerda = e.clientX <= rect.left + margem;
        const direita = e.clientX >= rect.right - margem;

        const superior = e.clientY <= rect.top + margem;
        const inferior = e.clientY >= rect.bottom - margem;

        if (superior && esquerda) return 'nw';
        if (superior && direita) return 'ne';

        if (inferior && esquerda) return 'sw';
        if (inferior && direita) return 'se';

        if (superior) return 'n';
        if (inferior) return 's';

        if (esquerda) return 'w';
        if (direita) return 'e';

        return null;
    }

    box.addEventListener('pointerdown', (e) => {
        if (!box.classList.contains('expandida')) return;
        if (e.button !== 0) return;

        const borda = identificarBorda(e);

        if (!borda) return;

        const rect = box.getBoundingClientRect();

        const pasta = box.closest('.SandBox');
        if (!pasta) return;

        const rectPasta = pasta.getBoundingClientRect();

        direcao = borda;

        posicaoX = e.clientX;
        posicaoY = e.clientY;

        larguraInicial = rect.width;
        alturaInicial = rect.height;

        esquerdaInicial =
            rect.left - rectPasta.left - pasta.clientLeft + pasta.scrollLeft;

        topoInicial =
            rect.top - rectPasta.top - pasta.clientTop + pasta.scrollTop;


        box.style.left = `${esquerdaInicial}px`;
        box.style.top = `${topoInicial}px`;

        redimensionamento = true;

        box.setPointerCapture(e.pointerId);

        e.stopPropagation();
        e.preventDefault();
    });


    box.addEventListener('pointermove', (e) => {

        if (!redimensionamento) {
            const borda = identificarBorda(e);

            const cursores = {
                nw: 'nwse-resize',
                se: 'nwse-resize',
                ne: 'nesw-resize',
                sw: 'nesw-resize',
                n: 'ns-resize',
                s: 'ns-resize',
                e: 'ew-resize',
                w: 'ew-resize'
            };

            box.style.cursor = cursores[borda] || 'default';

            return;
        }

        e.stopPropagation();

        const diferencaX = e.clientX - posicaoX;
        const diferencaY = e.clientY - posicaoY;

        let novaLargura = larguraInicial;
        let novaAltura = alturaInicial;

        let novaEsquerda = esquerdaInicial;
        let novoTopo = topoInicial;

        // Redimensionamento horizontal.
        if (direcao.includes('e')) {
            novaLargura = Math.max(
                larguraMinima,
                larguraInicial + diferencaX
            );
        }

        if (direcao.includes('w')) {
            novaLargura = Math.max(
                larguraMinima,
                larguraInicial - diferencaX
            );

            novaEsquerda =
                esquerdaInicial + (larguraInicial - novaLargura);
        }

        if (direcao.includes('s')) {
            novaAltura = Math.max(
                alturaMinima,
                alturaInicial + diferencaY
            );
        }

        if (direcao.includes('n')) {
            novaAltura = Math.max(
                alturaMinima,
                alturaInicial - diferencaY
            );

            novoTopo =
                topoInicial + (alturaInicial - novaAltura);
        }

        box.style.width = `${novaLargura}px`;
        box.style.height = `${novaAltura}px`;

        box.style.left = `${novaEsquerda}px`;
        box.style.top = `${novoTopo}px`;
    });


    function finalizarRedimensionamento() {
        redimensionamento = false;
        direcao = null;
    }

    box.addEventListener('pointerup', finalizarRedimensionamento);
    box.addEventListener('pointercancel', finalizarRedimensionamento);
}
redimensionarBoxExpandida(box)

function anotacoesLivres(box){
    let arrastando= false;

    let alturaInicial =0
    let larguraInicial =0

    box.addEventListener('pointerdown',(e)=>{
        if(!e.target.closest('.newBoxTable')){return}

        const rect=box.getBoundingClientRect()

        const pointerX= e.clientX
        const pointerY=  e.clientY

        const larguraInicial=box.left
        const alturaInicial=box.right


    })

}