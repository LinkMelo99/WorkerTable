const areaTables = document.getElementById('areaDeTables');
const templateBoxTransparente = document.getElementById('boxTransparente');

let pasta = null;

areaTables.addEventListener('click', () => {
    if (pasta) return;

    const clone = templateBoxTransparente.content.firstElementChild.cloneNode(true);

    ladoDir.appendChild(clone);
    configurarArrasto(clone);

    clone.addEventListener('click', (event) => {
        if (event.target.closest('.armazenamentoPasta')) return;

        clone.classList.toggle('aberta');
    });

    pasta = clone;
});


function overPasta(box) {

    if (!pasta) return false;

    const limitePasta = pasta.getBoundingClientRect();
    const rect = box.getBoundingClientRect();

    return (
        rect.left < limitePasta.right &&
        rect.right > limitePasta.left &&
        rect.top < limitePasta.bottom &&
        rect.bottom > limitePasta.top
    );
}


document.addEventListener('pointerup', (e) => {

    const box = e.target.closest('.newBoxTable');

    if (!box) return;

    const over = overPasta(box);
    if (!over) return;

    const armazenamentoPasta = pasta.querySelector('.armazenamentoPasta');
    armazenamentoPasta.appendChild(box);

    const miniatura = document.createElement('button')
    miniatura.classList.add('miniaturaPastas')

    const titulo = box.querySelector('.inputDoTituloNovaBox,.inputDoTituloDaBox')
    miniatura.textContent= '🗂️ ' + (titulo?.value.trim() || 'Box guardada');

    console.log('Novo elemento pai:', box.parentElement);
});