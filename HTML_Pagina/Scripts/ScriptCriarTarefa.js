const inputTarefa = document.getElementById('tarefaExeample')
const btnAdicionar = document.getElementById('btnAdicionar')
const listaTarefa = document.getElementById('listaTarefas')
const templateTarefa = document.getElementById('modeloTarefa')

function formatarData(valor) {
    if (!valor) return ''
    return new Date(valor).toLocaleString('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short'
    })
}

function lerTarefa() {
    const tarefa = inputTarefa.value.trim()

    if (tarefa === '') {
        alert('Tarefa não pode estar vazia')
        return null
    }
    return tarefa
}

function criarTarefa(tarefa) {
    const clone = templateTarefa.content.cloneNode(true)

    const li = clone.querySelector('li')
    const titulo = clone.querySelector('.textoTitulo')
    const btnData = clone.querySelector('.buttonData')
    const btnRemover = clone.querySelector('.buttonRemover')
    const painel = clone.querySelector('.datasInicioeFim')
    const resumo = clone.querySelector('.textoHidden')
    const inicio = clone.querySelector('.dataInicio')
    const fim = clone.querySelector('.dataFim')

    titulo.textContent = tarefa

    function alterarResumo() {
        const partes = []

        // pega as datas digitadas, formata e guarda no array
        if (inicio.value) partes.push('Início: ' + formatarData(inicio.value))
        if (fim.value) partes.push('Fim: ' + formatarData(fim.value))

        // escreve no <small>
        resumo.textContent = partes.join(' - ')
        // sem conteúdo: esconde. Com conteúdo: mostra
        resumo.hidden = partes.length === 0
    }

    function verificarData(data) {
        if (inicio.value && fim.value && inicio.value > fim.value) {
            alert('Data de início maior que o fim')
            data.value = ''
        }
        alterarResumo()
    }


    inicio.addEventListener('change', () => verificarData(inicio))
    fim.addEventListener('change', () => verificarData(fim))

    btnData.addEventListener('click', () => {
        painel.hidden = !painel.hidden
        btnData.setAttribute('aria-expanded', String(!painel.hidden))
    })

    btnRemover.addEventListener('click', () => li.remove())

    listaTarefa.appendChild(clone)   // insere a cópia, não um li novo
}



function adicionarTarefa() {
    const tarefa = lerTarefa()
    if (tarefa === null) return

    criarTarefa(tarefa)

    inputTarefa.value = ''
    inputTarefa.focus()
}

btnAdicionar.addEventListener('click', adicionarTarefa)
inputTarefa.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        adicionarTarefa()
    }
})



















