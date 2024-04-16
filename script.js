///imc
///Capturar os valores  -ok
// calcular-ok
/// gerar classificação do IMC-ok
// organizar as informações
//salvar os dados
//Ler a lista com  os dados
// Renderizar o conteúdo no HTML(tabela)
//Botão de limpar os registros(Clear(LocalStorage))
function CalcularValores(event){
    //responsável por chamar todas as funções
    event.preventDefault();
    let dadosUsuario = CapturarValores();

    let imc= CalcularIMC(dadosUsuario.altura, dadosUsuario.peso);

    let clasificacao= ClassificarIMC(imc);

    let dadosUsuarioCompleto= OrganizarDados(dadosUsuario,imc,clasificacao);

     CadastroUsuario(dadosUsuarioCompleto);

    window.location.reload();

}

function CapturarValores(){
    const nome= document.getElementById('name').value;
    const altura=document.getElementById('height').value;
    const peso=document.getElementById('weight').value;

    const dadosUsuario = {
        nome: nome,
        altura: altura,
        peso: peso

    }
    return dadosUsuario;
}
function CalcularIMC(altura,peso){
    const imc= peso/(altura*altura)
    return imc
}
function ClassificarIMC(imc){
    if (imc<18.5){
        return "Abaixo do peso"
    }else if(imc<25){
        return "Peso normal"
    }else if(imc<30){
        return "Sobrepeso"
    }else{
        return"Obesidade"
    }

}
function OrganizarDados(dadosUsuario,valorImc,classificacaoImc){
    const dataHoraAtual=Intl.DateTimeFormat('pt-BR',{timeStyle: 'long', dateStyle: 'short'}).format(Date.now())
    const dadosUsuarioCompleto ={
        ...dadosUsuario,
        imc: valorImc.toFixed(2),
        classificacaoImc:classificacaoImc,
        dataCadastro: dataHoraAtual

    }
     return dadosUsuarioCompleto
}
function CadastroUsuario(usuario){
    //CRIA UM ARRAY VAZIO PARA ARMAZENAR VALORES DE USUÁRIO
    let listUsuario =[];
  if (localStorage.getItem("usuariosCadastrados")){
    //Se sim, eu guardo as informações do array
    listUsuario = JSON.parse(localStorage.getItem("usuariosCadastrados"));
  }

//cadastrar usuário dentro do array
listUsuario.push(usuario)
//caso contrário, eu crio um novo item no localStorage
//stringfy=>objeto para JSON
localStorage.setItem("usuariosCadastrados", JSON.stringify(listUsuario))
}
function carregarUsuario(){

    let listUsuario=[];

    if(localStorage.getItem("usuariosCadastrados")){
        listUsuario= JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    if(listUsuario.length == 0){
        let tabela = document.getElementById('corpo-tabela');

        tabela.innerHTML= `
        <tr class='linha-mensagem'>
           <td colspan='6'> Nenhum Usuário Cadastrado </td>
        </tr>  
     `
     
    }else{
        montarTabela(listUsuario)
    }
}

window.addEventListener('DOMContentLoaded', () => carregarUsuario())

function montarTabela(listaDeCadastrados){
    let tabela = document.getElementById('corpo-tabela')
   
    let template='';
    
    listaDeCadastrados.forEach(pessoa => {
        template +=`
     <tr>
         <td data-cell="nome">${pessoa.nome}</td>
         <td data-cell="altura">${pessoa.altura}</td>
         <td data-cell="peso">${pessoa.peso}</td>
         <td data-cell="imc">${pessoa.imc}</td>
         <td data-cell="clasificacao">${pessoa.classificacaoImc}</td>
         <td data-cell="dataCadastro">${pessoa.dataCadastro}</td>
    </tr>
     `    
    });

    tabela.innerHTML=template;
}

function deletarRegistros(){
    let listUsuario=[];
    listUsuario.splice(dadosUsuario)

    localStorage.removeItemItem("dadosUsuario", JSON.stringify(listUsuario))
    }
