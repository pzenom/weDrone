const Token = artifacts.require("MyToken");

// truffle migrate --reset 

module.exports = function(deployer) {

    const _name = "DronTk";
    const _symbol = "DTK";
    const _decimals = 2;
    const _initialAmount = 1000000;

    deployer.deploy(Token, _name, _symbol, _decimals, _initialAmount);


};