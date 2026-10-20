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
            if (inputTitulo.value.trim() === '') {
                inputTitulo.value = 'WorkTable';
            }

            inputTitulo.blur();
        }
    });

    // Inserir a box na página
    ladoDirNewBox.appendChild(clone);

    // Configurar o arrasto da box criada
    configurarArrasto(box);
}

buttonAddBox.addEventListener('click', criarBox);