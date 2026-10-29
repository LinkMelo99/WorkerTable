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

