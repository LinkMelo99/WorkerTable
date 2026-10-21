const textoBoasVindas = " # Bem-vindo ao WorkTable!\n" +
    "\n" +
    "Organize suas ideias, crie caixas de tarefas e acompanhe seus projetos em um só lugar.\n" +
    "\n" +
    "Defina prioridades, estabeleça prazos e delegue tarefas à sua equipe para trabalhar de forma mais eficiente.\n" +
    "\n" +
    "**Organize. Colabore. Realize.**"

let indice=0;
let texto= document.getElementById('texto-digitado');
const time = 30;

function leituraTexto(){
    if(indice< textoBoasVindas.length){
        texto.textContent+=textoBoasVindas.charAt(indice)
        indice++;
        setTimeout(leituraTexto,time)
    }
}
leituraTexto()
 //ORGANIZAR H1 e P com appenCHILD