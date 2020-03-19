const Contrato = artifacts.require("ContratoPrueba");

module.exports = function(deployer) {
    deployer.deploy(Contrato);
};