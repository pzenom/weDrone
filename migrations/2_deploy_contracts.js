const ContratoPrueba = artifacts.require("TestContrato");

module.exports = function(deployer) {
    deployer.deploy(ContratoPrueba);
};