const ladoDirNewBox= document.getElementById('ladoDir')
const cloneTemplate= document.getElementById('createBox')
const buttonAddBox= document.getElementById('btnAdd')

function criarBox(){
    const clone=cloneTemplate.content.cloneNode(true)

    const inputTitulo = clone.querySelector('.inputDoTituloNovaBox');
    const inputTarefa = clone.querySelector('.inputNomeNovaBoxTarefa');
    const botaoAdd = clone.querySelector('.buttonCreateBox');
    const lista = clone.querySelector('.listaDeTarefas');

    function adicionarTarefa() {
        criarTarefa(inputTarefa.value, lista);
        inputTarefa.value = '';
    }

    botaoAdd.addEventListener('click', adicionarTarefa);

    inputTarefa.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') adicionarTarefa();
    });

    inputTitulo.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            if (inputTitulo.value.trim() === '') inputTitulo.value = 'WorkTable';
            inputTitulo.blur();
        }
    });

    ladoDirNewBox.appendChild(clone);
}

buttonAddBox.addEventListener('click', criarBox);

