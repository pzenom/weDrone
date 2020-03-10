pragma solidity 0.4.6;

import "./ModeloEmpresa.sol";
import "./Ownable.sol";

contract Modelo is ModeloEmpresa, Owned  {

    enum PESTICIDAS { PESTICIDA_A, PESTICIDA_B, PESTICIDA_C, PESTICIDA_D, PESTICIDA_E }
    enum ESTADO { LIBRE, ASIGNADO, FUMIGANDO }

    event LOG_DRON_INFO (address indexed direccionDron, uint256 altura_maxima, uint256 altura_minima, uint256 id);
    event LOG_DRON_INFO (address indexed direccionDron, uint256 altura_maxima, uint256 altura_minima, uint256 id, uint256 coste);
    event LOG_PARCELA_FUMIGADA (address indexed _direccionParcela );
    event LOG_PARCELA_INFO(address indexed direccionParcela, address indexed empresaPropietaria,
                            uint256 altura_maxima, uint256 altura_minima, PESTICIDAS pesticida, uint256 id);

    struct Dron {
        address direccion;
        uint256 id;
        // address empresaPropietaria; //Si me da tiempo hago gestión de propietarios de drones (pero es la misma)
        uint256 altura_maxima;
        uint256 altura_minima;
        ESTADO estado;
        PESTICIDAS pesticidasHomologados;
        uint256 coste;
    }

    mapping(address => Dron) private drones;
    address[] private dronesList;

    // mapping(address => (address => Parcela)) private parcelasEmpresa;

    function existeDron (address _direccionDron) public constant returns(bool id) {
        if(dronesList.length == 0) {
            return false;
        }
        return (drones[_direccionDron].direccion == _direccionDron);
    }

    function insertaDron (address _direccionDron, uint256 _altura_maxima,
                            åuint256 _altura_minima, uint256 _coste) public onlyOwner returns(uint256 _id) {
        require (_altura_maxima > 0 && _altura_minima > 0, "No volamos o que?");
        // require (getDronesCount() >= 0, "No hay drones");
        require (_altura_maxima >= _altura_minima, "Tamos haciéndolo mal con las alturas");
        require (_coste >= 0, "No se aceptan costes negativos, Aguililla!");
        drones[_direccionDron].direccion = _direccionDron;
        drones[_direccionDron].id = dronesList.push(_direccionDron); // getDronesCount()+1;
        drones[_direccionDron].altura_maxima = _altura_maxima;
        drones[_direccionDron].altura_minima = _altura_minima;
        drones[_direccionDron].coste = _coste;
        drones[_direccionDron].estado = ESTADO.LIBRE;
        emit LOG_DRON_INFO(_direccionDron, _altura_maxima, _altura_minima, drones[_direccionDron].id);
        return drones[_direccionDron].id;
    }

    function getDronesCount() public view returns (uint256 total) {
        return dronesList.length;
    }

    function getDron ( address _direccionDron ) public view returns ( ESTADO _estado, uint256 _id) {
        // require (existeDron(_direccionDron), "El Dron no existe");
        return (drones[_direccionDron].estado, drones[_direccionDron].id);
    }

    function setMaxHeight(address _direccionDron, uint256 _altura_maxima) public onlyOwner {
        require(existeDron(_direccionDron), "Nonexistent dron");
        require(_altura_maxima >= drones[_direccionDron].altura_minima, "DRON PARAM INCORRECT ==>  MAX HEIGHT IS LOWER THAN MIN HEIGHT");
        drones[_direccionDron].altura_maxima = _altura_maxima;
        emit LOG_DRON_INFO(_direccionDron, _altura_maxima, drones[_direccionDron].altura_minima,
                            drones[_direccionDron].id, drones[_direccionDron].coste);
    }

    function setMinHeight(address _direccionDron, uint256 _altura_minima) public onlyOwner {
        require(existeDron(_direccionDron), "Nonexistent dron");
        require(_altura_minima <= drones[_direccionDron].altura_maxima, "DRON PARAM INCORRECT ==>  MIN HEIGHT IS HIGHER THAN MAX HEIGHT");
        drones[_direccionDron].altura_minima = _altura_minima;
        emit LOG_DRON_INFO( _direccionDron, drones[_direccionDron].altura_maxima, _altura_minima,
                            drones[_direccionDron].id, drones[_direccionDron].coste);
    }

    function setTokenState (address _direccionDron, ESTADO _dronState) private onlyOwner {  //internal virtual {
        require(existeDron(_direccionDron), "Nonexistent dron");
        drones[_direccionDron].estado = _dronState;
    }

    function setPesticida (address _direccionDron, PESTICIDAS _pesticida) private onlyOwner {  //internal virtual {
        require(existeDron(_direccionDron), "Nonexistent dron");
        drones[_direccionDron].pesticidasHomologados = _pesticida;
    }

    function buySpray (address _direccionDron, address _direccionParcela, PESTICIDAS _pesticida ) public onlyOwner {
        require(existeDron(_direccionDron), "Nonexistent dron");
        require(drones[_direccionDron].estado == ESTADO.LIBRE, "DRON STATUS INCORRECT ==>  IS NOT LIBRE");
        //verificar con requires que cumple con lo necesitado (Alturas y demás)

        setTokenState(_direccionDron, ESTADO.ASIGNADO); // Bloquearlo a modo de semaforo
        // Gestionar el cobro aquí.

        setPesticida (_direccionDron, _pesticida);
        startSpray (_direccionDron);
        freeSpray  (_direccionDron);
        emit LOG_PARCELA_FUMIGADA (_direccionParcela);
    }

    function startSpray (address _direccionDron ) public onlyOwner {
        require(existeDron(_direccionDron), "Nonexistent dron");
        require(drones[_direccionDron].estado == ESTADO.ASIGNADO, "DRON STATUS INCORRECT ==>  IS NOT ASIGNADO");
        setTokenState(_direccionDron, ESTADO.FUMIGANDO);
    }

    function stopSpray (address _direccionDron) public onlyOwner {
        require(existeDron(_direccionDron), "Nonexistent dron");
        require(drones[_direccionDron].estado == ESTADO.FUMIGANDO, "DRON STATUS INCORRECT ==>  IS NOT FUMIGANDO");
        setTokenState(_direccionDron, ESTADO.ASIGNADO);
    }

    function freeSpray (address _direccionDron) public onlyOwner {
        require(existeDron(_direccionDron), "Nonexistent dron");
        require(drones[_direccionDron].estado != ESTADO.LIBRE, "DRON STATUS INCORRECT ==>  IS LIBRE");
        setTokenState(_direccionDron, ESTADO.LIBRE);
    }

    /* GESTION DE PARCELAS */

    struct Parcela {
        address direccion;
        uint256 id;
        address empresaPropietaria; //Si me da tiempo hago gestión de propietarios de drones (pero es la misma)
        uint256 altura_maxima;
        uint256 altura_minima;
       //ESTADO estado;
        PESTICIDAS pesticidaValido;
        //uint256 coste;
    }

    mapping(address => Parcela) private parcelas;
    address[] private parcelasList;

    function existeParcela (address _direccionParcela) public view returns(bool id) {
        if(parcelasList.length == 0) {
            return false;
        }
        return (parcelas[_direccionParcela].direccion == _direccionParcela);
    }

    function insertaParcela ( address _direccionParcela, uint256 _altura_maxima, uint256 _altura_minima, PESTICIDAS _pesticida) public
    returns(uint256 _id)  {
        // hacer un require de msg.sender = existaComoEmpresa
        require (existeEmpresa(msg.sender), "La empresa no existe");
        require (_altura_maxima > 0 && _altura_minima > 0, "No va venir nada a volar o que?");
        require (_altura_maxima >= _altura_minima, "Tamos haciéndolo mal con las alturas");
        // require ( _pesticida <= PESTICIDAS.PESTICIDA_E, "No se aceptan pesticidas que no son homologados!"); No hace falta
        parcelas[_direccionParcela].direccion = _direccionParcela;
        parcelas[_direccionParcela].id = parcelasList.push(_direccionParcela); // getDronesCount()+1;
        parcelas[_direccionParcela].altura_maxima = _altura_maxima;
        parcelas[_direccionParcela].altura_minima = _altura_minima;
        emit LOG_PARCELA_INFO( _direccionParcela, parcelas[_direccionParcela].empresaPropietaria,
                                _altura_maxima, _altura_minima, _pesticida, parcelas[_direccionParcela].id);
        return parcelas[_direccionParcela].id;
    }

    function getParcelasCount() public view returns (uint256 total) {
        return parcelasList.length;
    }

    function getParcela ( address _direccionParcela ) public view returns ( address _owner, uint256 _id, PESTICIDAS _pesticidaValido ) {
        require (existeParcela(_direccionParcela), "La Parcela no existe");
        return (parcelas[_direccionParcela].empresaPropietaria, parcelas[_direccionParcela].id, parcelas[_direccionParcela].pesticidaValido);
    }
}