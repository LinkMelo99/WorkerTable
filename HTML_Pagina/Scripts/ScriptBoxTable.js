const getBox=document.getElementById("boxTable")

let arrastando=false;
let eixoX=0;
let eixoY=0;


getBox.addEventListener("pointerdown",(event)=>{

    arrastando=true;

    eixoX=event.clientX-getBox.offsetLeft;
    eixoY=event.clientY-getBox.offsetTop;

    getBox.setPointerCapture(event.pointerId);
})

getBox.addEventListener("pointermove",(event)=>{

    if(!arrastando) return;

    getBox.style.left = `${event.clientX - eixoX}px`;
    getBox.style.top = `${event.clientY - eixoY}px`;
})

getBox.addEventListener("pointerup", (event) => {

    arrastando = false;

    getBox.releasePointerCapture(event.pointerId);
});