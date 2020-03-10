pragma solidity 0.4.6;

contract ModeloEmpresa {

    struct Empresa {
        address direccion;
        string nombre;
        uint256 id;
    }

    mapping(address => Empresa) private empresas;
    address[] private empresasList;

   event LOG_NuevaEmpresa   (address indexed direccionEmpresa, string nombre, uint256 id);

    function existeEmpresa (address _direccionEmpresa) public view returns(bool id) {
        if(empresasList.length == 0) {
            return false;
        }
        return (empresas[_direccionEmpresa].direccion == _direccionEmpresa);
    }

    function insertaEmpresa ( address _direccionEmpresa, string _nombre) public returns(uint256 id) {
        require (!existeEmpresa(_direccionEmpresa), "La empresa no existe");
        empresas[_direccionEmpresa].direccion = _direccionEmpresa;
        empresas[_direccionEmpresa].nombre = _nombre;
        empresas[_direccionEmpresa].id = empresasList.push(_direccionEmpresa);
        emit LOG_NuevaEmpresa(_direccionEmpresa, _nombre, empresas[_direccionEmpresa].id);
        return empresasList.length-1;
    }

    function getEmpresasCount() public view returns (uint256 total) {
        return empresasList.length;
    }

    function getEmpresa ( address _direccionEmpresa ) public view returns ( string nombre, uint256 id) {
        require (existeEmpresa(_direccionEmpresa), "La empresa no existe");
        return (empresas[_direccionEmpresa].nombre, empresas[_direccionEmpresa].id);
    }

    function getEmpresaAtIndex ( uint256 _id ) public view returns ( address _direccionEmpresa) {
        require (_id <= empresasList.length, "El id no existe");
        return (empresasList[_id-1]);//el index de la estructura no es el mismo que el del array (que empieza en 0)
    }

}
