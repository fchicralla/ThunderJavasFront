function carregaAgencias(){
    fetch("http://localhost:8088/agencias")
        .then(res => res.json())
        .then(listaAgencias => preencheCombobox(listaAgencias));

}


function preencheCombobox(listaAgencias){
    var templateSelect = `<select class="form-group" id="selectAgencia"> {{OPCOES}} </select>`;
    var templateOption = `<option value="{{VALOR}}"> {{NOME}} </option>`;

    var opcoes="";
    for (i=0;i<listaAgencias.length;i++){
        var ag = listaAgencias[i];
        opcoes+=templateOption.replace("{{VALOR}}",ag.id).replace("{{NOME}}",ag.nome);
    }
    document.getElementById("Agencia").innerHTML = templateSelect.replace("{{OPCOES}}",opcoes);
    console.log(opcoes)
}

function cadastraAgendamento(){

    var txtnomeCliente = document.getElementById("ClienteNome").value;
    var txtemailCliente = document.getElementById("ClienteEmail").value;
    var txtcelularCliente = document.getElementById("ClienteCelular").value;
    var txtdataAgendamento = document.getElementById("DataAgendamento").value;
    var txthoraAgendamento = document.getElementById("HoraInicio").value;
    var txtobservacoes = document.getElementById("Observacao").value;
    var txtagencia = document.getElementById("Agencia").value;


    //Body
    var msgBody={
        nomeCliente: txtnomeCliente,
        emailCliente: txtemailCliente,
        celularCliente: txtcelularCliente,
        dataAgendamento: txtdataAgendamento,
        horaAgendamento: txthoraAgendamento,
        observacoes: txtobservacoes,
        agencia: {
            id:txtagencia
        }
    }

    console.log(msgBody);
    
    //Header
    var cabecalho = {
        method : "POST",
        body : JSON.stringify(msgBody), //Converte para string
        headers:{
            "Content-type":"application/json"
        }
    };

    fetch("http://localhost:8088/agendamentos/novo",cabecalho)
        .then(res => trataResposta(res))
        
}

function trataResposta(res){
    if (res.status == 201){
        res.json().then(agendamento => geraProtocolo(agendamento));
    }
    else{
        alert("Problemas ao enviar sua solicitacao - Entre em contato com SAC");
    }
}

function geraProtocolo(agendamento){
    alert("Agendamento Concluido. Numero do Protocolo "+agendamento.numSeq);

}