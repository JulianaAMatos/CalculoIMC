///imc
///Capturar os valores  -ok
// calcular-ok
/// gerar classificação do IMC-ok
// organizar as informações
//salvar os dados
//Ler a lista com  os dados
// Renderizar o conteúdo no HTML(tabela)
//Botão de limpar os registros(Clear(LocalStorage))

function CapturarValores(){
    const nome= document.getElementById('name').value;
    const altura=document.getElementById('heigth').value;
    const peso=document.getElementById('weigth').value;

    const dadosUsuario = {
        nome: nome,
        altura: altura,
        peso: peso

    }
    return dadosUsuário()
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
