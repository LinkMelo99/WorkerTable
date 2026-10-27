
const areaTables = document.getElementById('areaDeTables')
const templateBoxTransparente = document.getElementById('boxTransparente')

areaTables.addEventListener('click',()=>{
    const clone= templateBoxTransparente.content.firstElementChild.cloneNode(true)
    ladoDir.appendChild(clone)
    configurarArrasto(clone)
})