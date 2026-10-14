const box = document.getElementById('boxTable');
const lista = document.querySelector('.listaDeTarefas');

// Título da box
const inputTitulo = document.getElementById('tituloBox');
const tituloBox = document.querySelector('.tituloBox');
const buttonTituloTarefa = document.querySelector('.buttonTituloTarefa');

// Nome da tarefa
const inputNomeTarefa = document.getElementById('nomeTarefa');
const buttonAddTarefa = document.querySelector('.buttonAdicionar');

// Template
const template = document.getElementById('modeloTarefa');

//------------------------------------------------------//
// Nome da box
function nomeBox() {
    const titulo = inputTitulo.value.trim();
    if (titulo === '') return;

    tituloBox.textContent = titulo;

    inputTitulo.value = '';
    inputTitulo.focus();
}
inputTitulo.addEventListener('focus',()=>{
    inputTitulo.select()
})
inputTitulo.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') nomeBox();
});

//------------------------------------------------------//
// Criando tarefa
function criandoTarefa() {
    const nome = inputNomeTarefa.value.trim();
    if (nome === '') return;

    const cloneTemplate = template.content.cloneNode(true);

    // nome da tarefa
    cloneTemplate.querySelector('.textoTitulo').textContent = nome;

    // remover
    cloneTemplate.querySelector('.buttonRemover').addEventListener('click', (e) => {
        e.target.closest('li').remove();
    });

    // mostrar/esconder datas
    cloneTemplate.querySelector('.buttonData').addEventListener('click', (e) => {
        const botao = e.target;
        const datas = botao.closest('li').querySelector('.datasInicioeFim');

        datas.hidden = !datas.hidden;
        botao.setAttribute('aria-expanded', String(!datas.hidden));
    });

    // inputs das datas
    const inicio = cloneTemplate.querySelector('.dataInicio');
    const fim = cloneTemplate.querySelector('.dataFim');
    inicio.addEventListener('change', (e) => descricaoData(e.target.closest('li')));
    fim.addEventListener('change', (e) => descricaoData(e.target.closest('li')));


    // Descrição das tarefas
    const inputNotes = cloneTemplate.querySelector('.inputDescricao');
    const descricaoTexto = cloneTemplate.querySelector('.descricaoHidden');
    const areaNotes = cloneTemplate.querySelector('.descricaoNotes');
    const buttonNotes = cloneTemplate.querySelector('.buttonNotes');

    inputNotes.addEventListener('input', () => {
        const text = inputNotes.value.trim();

        descricaoTexto.textContent = text;
        descricaoTexto.hidden = text === '';
    });

  // Enter fecha o campo de notas
    inputNotes.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            areaNotes.hidden = true;
            buttonNotes.setAttribute('aria-expanded', 'false');
        }
    });

  // Botão Notes mostra/esconde o campo
    buttonNotes.addEventListener('click', () => {
        areaNotes.hidden = !areaNotes.hidden;
        buttonNotes.setAttribute('aria-expanded', String(!areaNotes.hidden));
    });


    //tudo adicionado no ul lista de tarefas
    lista.appendChild(cloneTemplate);

    inputNomeTarefa.value = '';
    inputNomeTarefa.focus();
}
buttonAddTarefa.addEventListener('click', criandoTarefa);

inputNomeTarefa.addEventListener('focus',()=>{

    inputNomeTarefa.select()
})
inputNomeTarefa.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') criandoTarefa();
});




//------------------------------------------------------//
// Datas
function formataData(data) {
    return new Date(data).toLocaleString('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short'
    });
}

function descricaoData(li) {
    const dataInicio = li.querySelector('.dataInicio');
    const dataFim = li.querySelector('.dataFim');
    const textoDataLabel = li.querySelector('.textoHidden');

    dataFim.min = dataInicio.value;

    if (dataInicio.value && dataFim.value && dataFim.value < dataInicio.value) {
        dataFim.value = '';
    }

    const textoData = [];
    if (dataInicio.value) textoData.push('Início: ' + formataData(dataInicio.value));
    if (dataFim.value) textoData.push('Fim: ' + formataData(dataFim.value));

    textoDataLabel.textContent = textoData.join(' | ');
    textoDataLabel.hidden = textoData.length === 0;
}

