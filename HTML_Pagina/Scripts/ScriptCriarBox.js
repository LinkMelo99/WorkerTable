const ladoDirNewBox = document.getElementById('ladoDir');
const cloneTemplate = document.getElementById('createBox');
const buttonAddBox = document.getElementById('btnAdd');

function criarBox() {
    const clone = cloneTemplate.content.cloneNode(true);

    const box = clone.querySelector('.newBoxTable');

    const inputTitulo = clone.querySelector('.inputDoTituloNovaBox');
    const inputTarefa = clone.querySelector('.inputNomeNovaBoxTarefa');
    const botaoAdd = clone.querySelector('.buttonCreateBox');

    const lista = clone.querySelector('.newListaDeTarefasTemplate');

    setColor(box)

    function adicionarTarefa() {
        criarTarefa(inputTarefa.value, lista);
        inputTarefa.value = '';
    }

    function setColor(box){

        const r = Math.floor(Math.random() * 76) + 180;
        const g = Math.floor(Math.random() * 76) + 180;
        const b = Math.floor(Math.random() * 76) + 180;

        box.style.backgroundColor=`rgb(${r},${g},${b})`
    }
    botaoAdd.addEventListener('click', adicionarTarefa);

    inputTarefa.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') adicionarTarefa();
    });

    inputTitulo.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            if (inputTitulo.value.trim() === '') {
                inputTitulo.value = 'WorkTable';
            }
            inputTitulo.blur();
        }
    });

    inputTitulo.addEventListener('click',()=>{
        inputTitulo.select();
    })

    // Inserir a box na página
    ladoDirNewBox.appendChild(clone);


    const x = (ladoDir.offsetWidth-box.offsetWidth)/2
    const y = (ladoDir.offsetHeight-box.offsetWidth)/2

    box.style.left=`${x}px`;
    box.style.top=`${y}px`;


    // Configurar o arrasto da box criada
    configurarArrasto(box);

    return box;
}
ladoDirNewBox.addEventListener('click',(event)=>{

    if(event.target.classList.contains('buttonRemoverNewBox')){
        const item=  event.target.closest('.newBoxTable')
        if(item){ item.remove()}
    }
})
buttonAddBox.addEventListener('click', criarBox);
window.addEventListener('DOMContentLoaded', () => {
   boxBColor= criarBox();
    boxBColor.style.backgroundColor='#fff'
});