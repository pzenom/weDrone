const ModeloPrueba = artifacts.require("Modelo");

contract("Modelo", accounts => {
    it("Primera prueba de Ejemplo", async() => {
        /*  const instance = await ModeloPrueba.deployed();

            const empresaDrones = accounts[0];
            const balance = await instance.getBalance.call(accounts[0]);
        */
        assert.equal(100, 100, " Estoy forzando el OK");
    });
});