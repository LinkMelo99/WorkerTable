const inputTarefa=document.getElementById('tarefaExeample');
const btnAdicionar=document.getElementById('btnAdicionar');
const listaTarefa=document.getElementById('listaTarefas');
const templateTarefa=document.getElementById('modeloTarefa');


function lerTarefa() {
    const tarefa = inputTarefa.value.trim()

    if (tarefa === '') {
        alert('Tarefa nao pode estar vazia')
        return
    }
    return tarefa
}

function formataData(data){
    if(data!=null){
        return new Date(data).toLocaleDateString('pt-Br',{
            dateStyle:'short',
            dateTime:'short'
        })
    }
}


function criarTarefa(tarefa){
    const Tarefa=document.createElement('li')
    const cloneTemplate=templateTarefa.content.cloneNode(true)

    const li = clone.querySelector('li')
    const btnData = clone.querySelector('.buttonData')
    const painel = clone.querySelector('.datasInicioeFim')
    const resumo = clone.querySelector('.textoHidden')
    const inicio = clone.querySelector('.dataInicio')
    const fim = clone.querySelector('.dataFim')

    Tarefa.textContent=tarefa

    const remove=removerTarefa(Tarefa)
    Tarefa.appendChild(remove)

    listaTarefa.appendChild(Tarefa)
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

function removerTarefa(tarefa){
    const btnRemocao= document.createElement('button')
    btnRemocao.textContent = 'x'
    btnRemocao.style.background = 'transparent'
    btnRemocao.style.color = 'white'
    btnRemocao.style.cursor = 'pointer'
    btnRemocao.classList.add('btn-remover')

    btnRemocao.addEventListener('mouseenter', () => {
        btnRemocao.style.color = 'red';
    });

    btnRemocao.addEventListener('mouseleave', () => {
        btnRemocao.style.color = 'white';
    });

    btnRemocao.addEventListener('click',function (){
        tarefa.remove();
    })

    return btnRemocao;
}
btnAdicionar.addEventListener('click' ,adicionarTarefa)
inputTarefa.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
});



















