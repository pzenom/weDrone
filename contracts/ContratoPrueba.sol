// We will be using Solidity version 0.5.3 
pragma solidity 0.5.16;

contract Contrato {
    string private message = "Si ves esto, entonces está funcionando esto bien la llamada al SC";

    function getMessage() public view returns(string memory) {
        return message;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}