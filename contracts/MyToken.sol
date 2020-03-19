pragma solidity 0.5.16;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract MyToken is ERC20, ERC20Detailed {
    using SafeMath for uint256;

    // Solo el propietario puede hacer ciertas cositas
    address public owner;
    string slogan;

    // EVENTOS
    event log_evento ( address indexed _from, string mensaje);

    // MODIFICADORES
    // Podria haberlo hec(ho) heredando de ownable, pero hice esto hace mas tiempo
    modifier soloPropietario() {
        // if (msg.sender == owner)
        require (owner != msg.sender, "No eres el propietario y no lo puedes cambiar");
            _;
    }

    constructor ( string memory _name, string memory _symbol, uint8 _decimals, uint256 initialAmount ) ERC20Detailed(_name, _symbol, _decimals) public {
        _mint(msg.sender, initialAmount);
        slogan = "Gestionamos nuestros Drones y te los llevamos a tu parcela";
    }

    // FUNCIONES ADICIONALES (FUERA DEL STANDARD)
    function transferOwnership(address newOwner) public soloPropietario {
        require(newOwner != address(0),"Invalid address");
        owner = newOwner;
    }

    function getSlogan() public view returns (string memory _slogan) {
        return slogan;
    }

    // Todos pueden invocarlo
    function setSloganByAny(string memory _slogan) public {
        slogan = _slogan;
        emit log_evento (msg.sender, _slogan);
    }

    // Solo el propietario puede cambiarlo
    function setSloganByOwner(string memory _slogan) public soloPropietario {
        slogan = _slogan;
        emit log_evento (msg.sender, _slogan);
    }


}