const MyToken = artifacts.require("MyToken");
// const BigNumber = web3.BigNumber;

// Aserciones
require('chai')
    // .use(require('chai-bignumber')(BigNumber))
    .should();

contract('MyToken', accounts => {

    // Variables iniciales
    const _name = "DronTk";
    const _symbol = "DTK";
    const _decimals = 2;
    const _initialAmount = 1000000;

    // Vamos a limpiar el contrato a cada test
    beforeEach(async function() {
        this.token = await MyToken.new(_name, _symbol, _decimals, _initialAmount);
    });

    describe('1: Verificación de valores básicos', function() {
        it('La moneda es DronTK', async function() {
            // this.token.name().then;
            const name = await this.token.name();
            name.should.equal(_name);
        });
        it('El símbolo es DTK', async function() {
            const symbol = await this.token.symbol();
            symbol.should.equal(_symbol);
        });
        // it('Tiene 2 decimales', async function() {
        //     const decimals = await this.token.decimals();
        //     decimals.should.be.bignumber.equal(_decimals);
        //     // decimals.should.equal(_decimals);
        // });
        // it('La Cantidad inicial es 1 millon', async function() {
        //     const initialAmount = await this.token.totalSupply();
        //     initialAmount.should.equal(_initialAmount);
        // });
    });
});