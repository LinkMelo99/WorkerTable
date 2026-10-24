
function configurarArrasto(box) {
    let arrastando = false;

    let offSetX = 0;
    let offSetY = 0;

    box.addEventListener('pointerdown', (event) => {

        if (event.target.closest('input, button, textarea, select, a')) {
            return;
        }

        const rect = box.getBoundingClientRect();

        offSetX = event.clientX - rect.left;
        offSetY = event.clientY - rect.top;

        arrastando = true;

        box.setPointerCapture(event.pointerId);
    });

    // Movimentar a box
    box.addEventListener('pointermove', (event) => {
        if (!arrastando) return;

        const pai = box.offsetParent;
        if (!pai) return;

        const rectPai = pai.getBoundingClientRect();

        const novoX = event.clientX
            - rectPai.left
            - pai.clientLeft
            + pai.scrollLeft
            - offSetX;

        const novoY = event.clientY
            - rectPai.top
            - pai.clientTop
            + pai.scrollTop
            - offSetY;

        box.style.left = `${novoX}px`;
        box.style.top = `${novoY}px`;
    });

    // Finalizar o arrasto
    function finalizarArrasto() {
        arrastando = false;
    }

    box.addEventListener('pointerup', finalizarArrasto);
    box.addEventListener('pointercancel', finalizarArrasto);
}
