const tituloTarefa= document.getElementById('nomeTarefa')

const tituloBox= document.querySelector('.tituloBox')
const inputTitulo= document.getElementById('tituloBox')
const buttonTituloTarefa= document.querySelector('.buttonTituloTarefa')



//Funcoes do titulo da box
function salvarTitulo() {
    const titulo = inputTitulo.value.trim()

    if (titulo === '') return

    tituloBox.textContent = titulo

    inputTitulo.value = ''
    inputTitulo.focus()
}
buttonTituloTarefa.addEventListener('click',salvarTitulo)
inputTitulo.addEventListener('keypress',(e)=>{

    if(e.key==='Enter'){
        salvarTitulo()
    }
})















