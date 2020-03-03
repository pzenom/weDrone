// We will be using Solidity version 0.5.3 
pragma solidity 0.5.16;

contract TestContract {
    string private message = "Si ves esto, has invocado el contrato!!";

    function getMessage() public view returns(string memory) {
        return message;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}