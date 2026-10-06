const inputTarefa=document.getElementById('tarefaExeample')
const btnAdicionar=document.getElementById('btnAdicionar')
const listaTarefa=document.getElementById('listaTarefas')


function lerTarefa() {
    const tarefa = inputTarefa.value.trim()

    if (tarefa === '') {
        alert('Tarefa nao pode estar vazia')
        return
    }
    return tarefa
}


function criarTarefa(tarefa){
    const criarTarefa=document.createElement('li')
    criarTarefa.textContent=tarefa

    const remove=removerTarefa(criarTarefa)
    criarTarefa.appendChild(remove)

    listaTarefa.appendChild(criarTarefa)
}


function adicionarTarefa(){
    const tarefa=lerTarefa()

    if(tarefa==null){
        return
    }
    criarTarefa(tarefa)

    inputTarefa.value=''
    inputTarefa.focus()
}

btnAdicionar.addEventListener('click' ,adicionarTarefa)

inputTarefa.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
});

function removerTarefa(tarefa){
    const btnRemocao= document.createElement('button')
    btnRemocao.textContent = 'x'
    btnRemocao.style.background = 'black'
    btnRemocao.style.color = 'white'

    btnRemocao.addEventListener('click',function (){
        tarefa.remove();
    })

    return btnRemocao;
}




















