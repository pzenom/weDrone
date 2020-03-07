pragma solidity ^0.5.16;

contract WeDrone {
    // Mapeo de cuentas públicas
    mapping ( address => uint ) public _creditosDron;

    // propietario del contrato
    address public propietarioContrato;

    // Deprecado: function weDoDrone () public {
    constructor () public {
        // ESTO HAY QUE CAMBIARLO A MI PROPIA MONEDA
        _creditosDron [msg.sender] = 10000;
    }

    // Si un dron se usa, deberia de ganar mantenimiento (es el coste minimo por uso)
    // Se verifica que sea su propietario y que disponga de fondos suficientes
    function gastoParaMantenimiento (address dron, uint cantidadPorUso ) public
        esElPropietario()
        tieneFondosSuficientes(cantidadPorUso)
        returns (bool fondosSuficientes) {

            _creditosDron [msg.sender] -= cantidadPorUso;
            _creditosDron [dron] += cantidadPorUso;
            return fondosSuficientes;

    }

    function contratarDron() public {
    }

    function pagoOperacion() public {}

    //  // En esta función es donde vamos a crear la contractación del servicio
    //  function contratarServicio (address propietario, address parcela ) public
    //     esElPropietario()
    //     tieneFondosSuficientes(0)
    //     returns (bool fondosSuficientes) {

    //         // Se verifica el pago del propietario de la finca
    //         // Se asocia un dron compatible ( calculo previo del coste en mi moneda )
    //         // Podemos plantearnos generar un contrato secundario (Factoria de fumigaciones)
    //         _creditosDron [msg.sender] -= cantidadPorUso;
    //         _creditosDron [dron] += cantidadPorUso;
    //         return fondosSuficientes;

    // }


    function getBalance (address addr) public view returns (uint) {
        return _creditosDron [addr];
    }

    // MODIFICADORES
    modifier esElPropietario () {
        require (msg.sender == propietarioContrato, "Quien envía la orden no es el Propietario");
        _;
    }
    modifier tieneFondosSuficientes (uint cantidadPorUso) {
        require (_creditosDron[msg.sender] >= cantidadPorUso, "No hay fondos suficientes");
        _;
    }

}