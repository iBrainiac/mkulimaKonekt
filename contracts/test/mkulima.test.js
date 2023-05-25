const mkulimaKonnect = artifacts.require("mkulima");
const Web3 = require("web3");
const web3 = new Web3("HTTP://127.0.0.1:7545");
contract("mkulima", (accounts) => {
  let a;

  beforeEach(async () => {
    a = await mkulimaKonnect.new();
  });

  it("should be able to add product", async () => {
    const add = await a.addProduct("ovacado", "1", "image", "Githurai");
    const product = await a.products(1);
    // console.log(product);
    assert.equal(product.productName, "ovacado");
  });

  it("should be able to buy product", async () => {
    const add = await a.addProduct(
      "ovacado",
      "1000000000000000000",
      "image",
      "Githurai"
    );
    const stock = await a.updateStock(1, 2);
    const balanceBeforeBuy = await web3.eth.getBalance(accounts[1]);
    const ownerBalanceBeforeBuy = await web3.eth.getBalance(accounts[0]);
    const buy = await a.buyProduct(1, {
      from: accounts[1],
      value: "1000000000000000000",
    });
    const balanceAfterBuy = await web3.eth.getBalance(accounts[1]);
    const ownerBalanceAfterBuy = await web3.eth.getBalance(accounts[0]);
    console.log(balanceBeforeBuy, balanceAfterBuy);
    console.log(ownerBalanceBeforeBuy, ownerBalanceAfterBuy);
  });
});
