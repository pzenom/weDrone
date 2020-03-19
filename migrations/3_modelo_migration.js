const Modelo = artifacts.require("Modelo");

module.exports = function(deployer) {
    deployer.deploy(Modelo);
};