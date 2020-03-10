pragma solidity 0.6.0;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract DroneERC20 is IERC20, Ownable {
    
    using SafeMath for uint256;

    /* Datos básicos */
    string public name;                              // Nombre del Token Creado
    string public symbol;                            // Acrónimo del Token de intercambio
    uint256 public decimals;                         // Total de decimales permitidos
    uint256 public _totalSupply;                     // Total de Tokens existentes
    mapping (address => uint256 ) private _balances; // Libro contable de balances
    mapping (address => mapping (address => uint256)) private _allowed; // Autorizaciones de Cargos 

    /* Otros datos adicionales */
    address feeHolder;                               // Comisiones de uso (garantizan un mínimo coste)
    uint256 fee;                                     // La comisión que nos vamos a comer
    // address public owner;                         // Propietario - Lo hago Ownable y listo

    /* @dev Constructor
    *  @param _initialAmount Cantidad minima con la que creamos el bicho. 
    */
    constructor (uint256 _initialAmount) public {
        // owner = msg.sender;
        feeHolder = msg.sender;
        name = "DronTk";
        symbol = "DTK";
        decimals = 6;
        // _mint(msg.sender, initialAmount);
        _totalSupply = _initialAmount;
        _balances[msg.sender] = _initialAmount;
    }

    /* @dev Establecemos quien será el que se coma comisiones
    *  @param _initialAmount Cantidad minima con la que creamos el bicho. 
    */
    function setFeeHolder (address _feeHolder ) public {
        feeHolder = _feeHolder;
        
    }

    function getFeeHolder () public view returns (address) {
        return feeHolder;
    }
    
    function totalSupply() override external view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) override external view returns (uint256) {
        return _balances[account];
    }

    function transfer(address recipient, uint256 amount) override external returns (bool){ 
        require(msg.sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
 
        uint256 fee = calcFee(amount);
 
        _balances[msg.sender] = _balances[msg.sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount - fee );
        _balances[feeHolder] = _balances[feeHolder].add(fee);
        emit Transfer(msg.sender, recipient, amount);
        
    }
    
    function calcFee(uint256 ammount) public returns (uint256) {
        return 1;
    }

    function allowance(address owner, address spender) override external view returns (uint256){
        return 0;
    }

    function approve(address spender, uint256 amount) override external returns (bool){
        
    }

    function transferFrom(address sender, address recipient, uint256 amount) override external returns (bool){
        
    }

    // event Transfer(address indexed from, address indexed to, uint256 value);

    // event Approval(address indexed owner, address indexed spender, uint256 value);
    
}