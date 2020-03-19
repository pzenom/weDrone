// Inicializo el web3
if (typeof web3 !== 'undefined') {
    // Si Tenemos metamask, se lanza por aqui
    web3 = new Web3(web3.currentProvider);
    console.log("Usando Metamask o equivalente");
} else {
    // Si no tiene metamask o equivalente, se lanza a por ganache
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
    // web3 = new Web3(new Web3.providers.HttpProvider('ws://10.141.8.11.8545'));
    console.log("Usando Ganache o equivalente");
}

// Mi contrato desplegado esta aqui
var contrato_token = '0xDF1a6c5206E75AF79917D61F5a9C0d815eE74b80';
var contrato_modelo = '0x1F5D4CB50D89146F98862857539dB1187cB36da4';
// Mis instancias de contrato estan aqui
var instanciaToken;
var instanciaModelo;

//Creo una variable miToken
var miToken;
var event;
var totalDrones = 0;
var totalParcelas = 0;

async function leerTexto() {

    await instanciaToken.methods.getSlogan().call({}, function(error, result) {
        $('#slogan').html("Si ves este texto, no has hecho nada");
        if (!error) {
            console.log('getText (' + result + ')');
            $('#slogan').html(result);
        } else
            console.error('getTextERROR' + error);
    });
}

function updateBalances() {
    getMyBalance(miToken, "miToken_tokens_0");
    getMyBalance(empresa, "empresa_tokens_0");
}

async function getMyBalance(whosBalance, _donde) {
    // console.log("Get My Balance " + whosBalance);
    await instanciaToken.methods.balanceOf(whosBalance).call({}, function(error, result) {
        if (!error) {
            // console.log('El balance de (' + whosBalance + ') es (' + result + ')');
            $('#' + _donde).html(result);
        } else
            console.error('getTextERROR' + error);
    });
    // console.log("END Get My Balance");

}

async function start() {
    // Me sacas tods las cuentas que hay
    const accounts = await web3.eth.getAccounts();

    // Cuentas
    miToken = accounts[0];
    dron1 = accounts[1];
    dron2 = accounts[2];
    empresa = accounts[3];
    parcela1 = accounts[4];
    // parcela2 = accounts[5];
    // Contrato
    instanciaToken = new web3.eth.Contract(ABI_MYTOKEN_DRONES, contrato_token);
    instanciaModelo = new web3.eth.Contract(ABI_MODELO, contrato_modelo);

    leerTexto();

    var ss_tmp_idParcela, ss_tmp_pesticida, ss_tmp_valor;


    // event = instanciaToken.log_evento({}, {
    //     fromBlock: 0,
    //     toBlock: 'latest'
    // });
    // // Escuchamos los eventos desde el bloque 0 (lo ideal es poner un numero de bloque mas cercano)

    // event.watch(function(error, result) {
    //     if (!error) {
    //         console.log("EVENTO:  Block number: " + result.blockNumber);
    //         console.log("XXX=> " + result.args._from + " Mensaje: " + mensaje);
    //         lanzaAviso();
    //     }
    //     // else {
    //     //     console.error(error);
    //     // }
    // });

    // Inicializamos todo (Lo ideal sería hacerlo de manera dinámica)   
    getTotalDrones();
    getTotalParcelas();
    existeEmpresa(empresa);
    updateBalances();

    // $('#miToken_tokens_0').html(getMyBalance(miToken));
    console.log("Carga Completa");

}

start();


async function getTotalDrones() {
    // alert("hota");
    // console.log("Loading Total Drones ");
    await instanciaModelo.methods.getDronesCount().call({}, function(error, result) {
        // console.log("Dentro de GetDronesCount");
        if (!error) {
            totalDrones = result;
            // console.log("No hay fallos");
            // console.log('getDronesCount (' + result + ')');
            document.getElementById('totalDrones').innerHTML = totalDrones;

        } else {
            console.error('TotalDronesError: ' + error);
        }
    });
    // console.log("TotalDronesAfterCall = " + totalDrones);
}

async function leerTexto() {
    await instanciaToken.methods.getSlogan().call({}, function(error, result) {
        $('#slogan').html("Si ves este texto, no has hecho nada");
        if (!error) {
            // console.log('getText (' + result + ')');
            $('#slogan').html(result);
        } else
            console.error('getTextERROR' + error);
    });
}

async function cambiarTexto() {
    // console.log(document.getElementById('textito').value);
    await instanciaToken.methods.setSloganByAny(document.getElementById('textito').value).send({
        from: miToken,
        gas: 5000000,
    }, function(error, result) {
        if (!error) {
            // console.log('getCandidateText (' + result + ')');
            leerTexto();
        } else
            console.error('getCandidateTextERROR' + error);
    }).on('receipt', function(receipt) {
        console.log(receipt);
    });
}



async function creaDron() {
    var d_address = document.getElementById('nd_address').value;
    var d_hmax = document.getElementById('nd_hmax').value;
    var d_hmin = document.getElementById('nd_hmin').value;
    var d_coste = document.getElementById('nd_coste').value;
    // console.log("Creando Dron con la forma: " + d_address + " : " + d_hmax + " : " + d_hmin + " : " + d_coste);

    await instanciaModelo.methods.insertaDron(d_address, d_hmax, d_hmin, d_coste).send({
        from: miToken,
        gas: 5000000,
    }, function(error, result) {
        if (!error) {
            console.log('Dron Added (' + result + ')');
            //alert("Dron Creado con la transaccion " + result);
        } else {
            console.error('Dron ERROR' + error);
            alert("Error al insertar un Dron: " + error);
        }
    }).on('receipt', function(receipt) {
        var _id = receipt.events.LOG_DRON_INFO.returnValues.id;
        alert("This is receipt del Dron: " + _id);
        var cuerpo = '<tr><th id="miToken_name_' + _id + '">' + _id + '</th><td id="miToken_address_' + _id + '">' + d_address + '</td><td>' + d_hmax + '</td><td>' + d_hmin + '</td><td id="dron_status_' + _id + '">LIBRE</td><td id="dron_coste_' + _id + '">' + d_coste + '</td><td id="td_crearmiTokenBtn_' + _id + '"></td></tr>';
        // console.log("CUERPO: " + cuerpo);
        // console.log(receipt);
        $("#dron_table tbody").append(cuerpo);
    });
    getTotalDrones();

}



async function lanzaAviso(_tipo, _error) {
    console.log("Lanza un aviso");
}



async function existeEmpresa(direccionEmpresa) {
    // console.log("Miramos si la empresa ya existe");
    await instanciaModelo.methods.existeEmpresa(direccionEmpresa).send({
        from: empresa,
        gas: 5000000,
    }, function(error, result) {
        if (!error) {
            console.log('Empresa Existe (' + result + ')');
            // alert("Empresa Existe en transaccion " + result);
        } else {
            console.error('Como la empresa no existe....' + error);
            crearEmpresa();
            // alert("Error la empresa no existe: " + error);
        }
    }).on('receipt', function(receipt) {
        ///var _id = receipt.events.LOG_DRON_INFO.returnValues.id;
        //alert("This is receipt del Dron: " + _id);
        //var cuerpo = '<tr><th id="miToken_name_' + _id + '">' + _id + '</th><td>' + d_address + '</td><td>' + d_hmax + '</td><td>' + d_hmin + '</td><td id="dron_status_' + _id + '">LIBRE</td><td id="dron_coste_' + _id + '">' + d_coste + '</td><td><button class="btn btn-primary" type="button" id="crearmiTokenBtn_' + _id + '" onclick="">Fumigar</button></td></tr>';
        // console.log("CUERPO: " + cuerpo);
        console.log("EMP* " + receipt);
        // document.getElementById('otros_card_body').innerHTML = receipt;
        $("#dron_table tbody").append(cuerpo);
    });
    console.log("Terminado Existe Empresa");
}


async function creaEmpresa() {
    console.log("Creando empresa");

    // Creamos empresame
    var e_nome = "Empresa Molona";
    await instanciaModelo.methods.insertaEmpresa(empresa, e_nome).send({
        from: empresa,
        gas: 5000000,
    }, function(error, result) {
        if (!error) {
            console.log('Empresa Added (' + result + ')');
            alert("Empresa Creado con la transaccion " + result);
        } else {
            console.error('Empresa ERROR' + error);
            alert("Error al insertar una Empresa: " + error);
        }
    }).on('receipt', function(receipt) {
        ///var _id = receipt.events.LOG_DRON_INFO.returnValues.id;
        //alert("This is receipt del Dron: " + _id);
        //var cuerpo = '<tr><th id="miToken_name_' + _id + '">' + _id + '</th><td>' + d_address + '</td><td>' + d_hmax + '</td><td>' + d_hmin + '</td><td id="dron_status_' + _id + '">LIBRE</td><td id="dron_coste_' + _id + '">' + d_coste + '</td><td><button class="btn btn-primary" type="button" id="crearmiTokenBtn_' + _id + '" onclick="">Fumigar</button></td></tr>';
        // console.log("CUERPO: " + cuerpo);
        console.log("EMP* " + receipt);
        // document.getElementById('otros_card_body').innerHTML = receipt;
        $("#dron_table tbody").append(cuerpo);
    });

    console.log("Empresa Creada");
}


async function getTotalParcelas() {
    // alert("hota");
    console.log("Loading Total Parcelas ");
    await instanciaModelo.methods.getParcelasCount().call({}, function(error, result) {
        // console.log("Dentro de GetParcelasCount");
        if (!error) {
            // totalparcelas = result;
            console.log("No hay fallos");
            console.log('getParcelassCount (' + result + ')');
            document.getElementById('totalParcelas').innerHTML = result;

        } else {
            console.error('TotalParelasError: ' + error);
        }
    });
    // console.log("TotalParcelasAfterCall = " + totalParcelas);
}



async function crearParcela() {
    console.log("Creando Parcela");
    var p_address = document.getElementById('np_address').value;
    var p_hmax = document.getElementById('np_hmax').value;
    var p_hmin = document.getElementById('np_hmin').value;
    var p_pesticida = document.getElementById('np_pesticida').value;

    console.log("Creando Parcela con la forma: " + p_address + " : " + p_hmax + " : " + p_hmin + " : " + p_pesticida);

    await instanciaModelo.methods.insertaParcela(p_address, p_hmax, p_hmin, p_pesticida).send({
        from: empresa,
        gas: 5000000,
    }, function(error, result) {
        if (!error) {
            console.log('Parcela Added (' + result + ')');
            //alert("Dron Creado con la transaccion " + result);
        } else {
            console.error('Parcela ERROR' + error);
            alert("Error al insertar una Parcela: " + error);
        }
    }).on('receipt', function(receipt) {
        // console.log(receipt.events.LOG_PARCELA_INFO.returnValues.id);
        // var _id = receipt.events.LOG_Parcela_INFO.returnValues.id;
        var _id = receipt.events.LOG_PARCELA_INFO.returnValues.id;
        // totalParcelas = _id;
        console.log(_id);
        alert("This is receipt de la Parcela: " + _id);
        var cuerpo = '<tr><th id="miParcela_id_' + _id + '">' + _id + '</th><td>' + p_address + '</td><td>' + p_hmax + '</td><td>' + p_hmin + '</td><td id="parcela_pesticida_' + _id + '">' + p_pesticida + '</td><td id="BotonFumigar_' + _id + '"><button class="btn btn-primary" type="button" id="solicitarFumigado' + _id + '" onclick="solicitarFumigado(' + _id + ', ' + p_hmax + ', ' + p_hmin + ', ' + p_pesticida + ' )">Solicitar</button></td></tr>';
        console.log("CUERPO: " + cuerpo);
        // console.log(receipt);
        $("#parcela_table tbody").append(cuerpo);
    });

    getTotalParcelas();

    // Para agilizar esto, vamos a hacer un transfer de mi momenda cada vez que se añada una parcela a modo de regalo
    transfer(empresa, 100);

}


async function transfer(_destinatario, _cantidad) {
    console.log("Iniciando transfer: " + _destinatario + ' * ' + _cantidad);
    await instanciaToken.methods.transfer(_destinatario, _cantidad).send({
        from: miToken,
        gas: 5000000,
    }, function(error, result) {
        if (!error) {
            console.log('Transferido (' + result + ')');
            //alert("Dron Creado con la transaccion " + result);
        } else {
            console.error('ERROR de transferencia' + error);
            alert("ERROR de transferencia: " + error);
        }
    }).on('receipt', function(receipt) {

        // var _id = receipt.events.LOG_PARCELA_INFO.returnValues.id;
        console.log(receipt);
        // alert("This is receipt de la Parcela: " + receipt.events);
        document.getElementById('otros_card_body').innerHTML = "Welcome transfer (Parcela Addedd): " + JSON.stringify(receipt.events) + "<hr />" + document.getElementById('otros_card_body').innerHTML;
    });

    console.log("Finalizan transfer");
    updateBalances();
}


function solicitarFumigado(_id, _hmax, _hmin, _pest) {

    // alert("Solicitando el fumigado de " + _id);
    console.log("Inicia solicitar fumigado: " + _id + ', ' + _hmax + ', ' + _hmin + ', ' + _pest);
    var table = document.getElementById('dron_table_body');
    var hayEltos = table.rows.length;

    // Limpiamos el select si hubiera algo
    document.getElementById('ss_dronesviables').innerHTML = "";


    // recorrer la tabla con jquery y buscar un dron libre que tenga la altura max y min en el rango
    for (var i = 0; i < hayEltos; i += 1) {
        var row = table.rows[i];
        var dronEsValido = 0;

        console.log(row);
        // verificar que la altura max del dron es es menor o igual
        if (row.cells[2].innerHTML > _hmax) {
            console.log("Dron " + row.cells[0].innerHTML + " Supera altura maxima permitida");
        } else {
            // Verifica que la altura minima del dron es mayor o igual
            if (row.cells[3].innerHTML < _hmin) {
                console.log("Dron " + row.cells[0].innerHTML + " incumple altura minima permitida");
            } else {
                console.log("Dron ( " + row.cells[2].innerHTML + ":" + row.cells[3].innerHTML + ") - Parcela (" + _hmax + ":" + _hmin + ")");
                var rowId = row.cells[0].innerHTML;
                console.log("Dron " + rowId + " cumple");
                var myOption = '<option id="option_dron_' + rowId + '" value=' + rowId + '>Dron <span id="option_dron_' + rowId + '">' + rowId + '</span> (Coste:<span id="option_dron_' + rowId + '_coste">' + row.cells[5].innerHTML + '</span>) </option>';
                console.log(myOption);
                document.getElementById('ss_dronesviables').innerHTML = JSON.stringify(myOption) + document.getElementById('ss_dronesviables').innerHTML;
                ss_tmp_idParcela = _id;
                ss_tmp_pesticida = _pest;
            }
        }

    }

    if (hayEltos) {
        $('#solicitaServicio').modal('show');
    } else {
        alert("AVISO: Primero tienes que tener drones en la tabla");
    }

    // Si el propietario está de acuerdo, la empresa de parcelas hace un allow
    // cambiar el estado del dron a asignado
    // activar el boton de fumigar del dron

    // <option id="option_dron_id" value="0">Dron <span id="dron_id">28</span> (Coste:<span id="dron_id_coste">28</span>) </option>
    console.log("Fin solicitar fumigado");
}

async function autorizarOperacion(_idDron) {
    var _cantidad = 25;
    // console.log("Solicitud recibida de: " + _idDron + " para ir a: " + ss_tmp_idParcela);
    // _cantidad = parseInt(document.getElementById('dron_coste_' + _idDron).value);
    // alert("Vamos a cargar: " + _cantidad);

    await instanciaToken.methods.approve(miToken, _cantidad).send({
        from: empresa,
        gas: 5000000,
    }, function(error, result) {
        if (!error) {
            console.log('Aprobado (' + result + ')');
            //alert("Dron Creado con la transaccion " + result);
        } else {
            console.error('ERROR de aprobacion' + error);
            alert("ERROR de aprobacion: " + error);
        }
    }).on('receipt', function(receipt) {

        // var _id = receipt.events.LOG_PARCELA_INFO.returnValues.id;
        console.log(receipt);
        // alert("This is receipt de la Parcela: " + receipt.events);
        document.getElementById('otros_card_body').innerHTML = "Aprobacion de cargo: " + JSON.stringify(receipt.events) + "<hr />" + document.getElementById('otros_card_body').innerHTML;
    });

    // Actualizamos la tabla
    document.getElementById('td_crearmiTokenBtn_' + _idDron).innerHTML = '<button class="btn btn-primary" type="button" id="crearmiTokenBtn_' + _idDron + '" onclick="ejecutaServicio( ' + _idDron + ', ' + ss_tmp_idParcela + ',' + ss_tmp_pesticida + ')">Fumigar</button>';
    document.getElementById('dron_status_' + _idDron).innerHTML = "ASIGNADO (" + ss_tmp_idParcela + ")";

    console.log("fin autorizcion");

}

async function ejecutaServicio(_idDron, _idParcela, _pesticida) {
    var _cantidad = document.getElementById('dron_coste_' + _idDron).innerHTML;
    alert("La empresa lanza el fumigado de " + _idDron + " contra la parcela " + _idParcela + ' usando ' + _pesticida + ' y con coste ' + _cantidad);

    // COBRA EL SERVICIO
    await instanciaToken.methods.transferFrom(empresa, miToken, _cantidad).send({
        from: miToken,
        gas: 5000000,
    }, function(error, result) {
        if (!error) {
            console.log('TransferFrom (' + result + ')');
            //alert("Dron Creado con la transaccion " + result);
        } else {
            console.error('ERROR de TransferFrom' + error);
            alert("ERROR de TransferFrom: " + error);
        }
    }).on('receipt', function(receipt) {

        // var _id = receipt.events.LOG_PARCELA_INFO.returnValues.id;
        console.log(receipt);
        // alert("This is receipt de la Parcela: " + receipt.events);
        document.getElementById('otros_card_body').innerHTML = "Transfer From: " + JSON.stringify(receipt.events) + "<hr />" + document.getElementById('otros_card_body').innerHTML;
    });

    updateBalances();

    // FUMIGA
    document.getElementById('dron_status_' + _idDron).innerHTML = "FUMIGANDO (" + ss_tmp_idParcela + ")";

    await instanciaModelo.methods.buySpray(dron1, parcela1, ss_tmp_pesticida).send({
        from: miToken,
        gas: 5000000,
    }, function(error, result) {
        if (!error) {
            console.log('Asignado (' + result + ')');
            //alert("Dron Creado con la transaccion " + result);
        } else {
            console.error('ERROR de Asignacion' + error);
            alert("ERROR de Asignacion: " + error);
        }
    }).on('receipt', function(receipt) {

        // var _id = receipt.events.LOG_PARCELA_INFO.returnValues.id;
        console.log(receipt);
        // alert("This is receipt de la Parcela: " + receipt.events);
        document.getElementById('otros_card_body').innerHTML = "Dron Ha Fumigado: " + JSON.stringify(receipt.events) + "<hr />" + document.getElementById('otros_card_body').innerHTML;
    });

    alert("AVISO: El botón de fumigar queda activado por si te interesa volver a fumigar, pero depende del allowance que tengas.");

    document.getElementById('dron_status_' + _idDron).innerHTML = "LIBRE";
    // transferfrom
    // fumiga
    // libera el dron
}

$(function() {
    $('#botonServicioContratado').on('click', function() {
        var select_value = $('#ss_dronesviables').val();
        autorizarOperacion(select_value);
        console.log(select_value);
    });
});