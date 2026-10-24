const getBox =  document.querySelector('.newBoxTable');
const ladoDir = document.getElementById("ladoDir");
const ladoEsq = document.querySelector(".ladoEsq");
const seta = document.getElementById("setaVoltar");
const btnAdd = document.getElementById("btnAdd");
const btnRemoverBox = document.querySelector('.buttonRemoverBox')

const drag=document.querySelector(".newListaDeTarefasTemplate");

let arrastando = false;
let moveu = false;
let eixoX = 0;
let eixoY = 0;
let inicioX = 0;
let inicioY = 0;
let ultimoX = 0;
let ultimoY = 0;

function limitar(left, top) {
    const limiteLeft = ladoDir.clientWidth  - getBox.offsetWidth;
    const limiteTop  = ladoDir.clientHeight - getBox.offsetHeight;

    return {
        left: Math.max(0, Math.min(left, limiteLeft)),
        top:  Math.max(0, Math.min(top, limiteTop))
    };
}

ladoDir.addEventListener("click", (e) => {
    if (e.target.closest("#getBox, #setaVoltar, #btnAdd")) return;
    ladoEsq.classList.add("escondido");
    seta.classList.add("visivel");
    btnAdd.classList.add("visivel");
    acompanharTransicao();
});

function posicionarNoPonteiro() {
    const dirRect = ladoDir.getBoundingClientRect();

    const pos = limitar(
        ultimoX - dirRect.left - ladoDir.clientLeft - eixoX,
        ultimoY - dirRect.top  - ladoDir.clientTop  - eixoY
    );

    getBox.style.left = `${pos.left}px`;
    getBox.style.top  = `${pos.top}px`;
}

function manterDentro() {
    const pos = limitar(getBox.offsetLeft, getBox.offsetTop);
    getBox.style.left = `${pos.left}px`;
    getBox.style.top  = `${pos.top}px`;
}

function acompanharTransicao(ms = 700) {
    const fim = performance.now() + ms;

    function quadro() {
        manterDentro();
        if (performance.now() < fim) requestAnimationFrame(quadro);
    }
    quadro();
}

function loopArraste() {
    if (!arrastando) return;
    if (moveu) posicionarNoPonteiro();
    requestAnimationFrame(loopArraste);
}

window.addEventListener("load", () => {
    getBox.style.left = `${(ladoDir.clientWidth  - getBox.offsetWidth)  / 2}px`;
    getBox.style.top  = `${(ladoDir.clientHeight - getBox.offsetHeight) / 2}px`;
});

window.addEventListener("resize", manterDentro);

getBox.addEventListener("pointerdown", (event) => {

    if (event.target.closest("input, button, label, li")) return;

    arrastando = true;
    moveu = false;

    inicioX = ultimoX = event.clientX;
    inicioY = ultimoY = event.clientY;

    const boxRect = getBox.getBoundingClientRect();
    eixoX = event.clientX - boxRect.left;
    eixoY = event.clientY - boxRect.top;

    getBox.setPointerCapture(event.pointerId);
    requestAnimationFrame(loopArraste);
});

  getBox.addEventListener("pointermove", (event) => {
    if (!arrastando) return;

    ultimoX = event.clientX;
    ultimoY = event.clientY;

    if (!moveu && Math.hypot(ultimoX - inicioX, ultimoY - inicioY) > 5  ) {
        moveu = true;
        ladoEsq.classList.add("escondido");
        seta.classList.remove("visivel");
        btnAdd.classList.remove("visivel")
        btnRemoverBox.classList.add("visivel")
    }

    if (moveu) posicionarNoPonteiro();
});

function soltar(event) {
    arrastando = false;

    if (getBox.hasPointerCapture(event.pointerId)) {
        getBox.releasePointerCapture(event.pointerId);
    }

    if (ladoEsq.classList.contains("escondido")) {
        seta.classList.add("visivel");
        btnAdd.classList.add("visivel");
    }
}

function buttonRemoverBox(){
    btnRemoverBox.addEventListener('click',()=>{
        getBox.remove()
    })
}




getBox.addEventListener("pointerup", soltar);
getBox.addEventListener("pointercancel", soltar);
btnRemoverBox.addEventListener('click',()=>{getBox.remove()})

seta.addEventListener("click", () => {
    ladoEsq.classList.remove("escondido");
    seta.classList.remove("visivel");
    btnAdd.classList.remove("visivel");
    btnRemoverBox.classList.remove("visivel")

    acompanharTransicao();
});
