const templateTarefa = document.getElementById('modeloTarefa')
const listaTarefa = document.getElementById('listaTarefas')

const nomeTarefa= document.getElementById('nomeTarefa')
const addTarefa = document.getElementById('btnAdicionar')



function criarTarefa(){
    const clone= templateTarefa.cloneNode(true)
    const tarefa = nomeTarefa.value.trim()

    




}

//Botao adicionar Tarefa
function botaoAdicionarTarefa(tarefa){
    addTarefa.addEventListener('click',()=>{
        const text= nomeTarefa.value.trim()

        if(text==='') return

        nomeTarefa.value=''
        nomeTarefa.focus()
    })
}











