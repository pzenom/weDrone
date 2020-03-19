const ModeloPrueba = artifacts.require("Modelo");

module.exports = function(deployer) {
    deployer.deploy(ModeloPrueba);
};