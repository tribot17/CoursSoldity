const simpleStorage = artifacts.require("simpleStorage.sol");
const { expect } = require("chai");
const { BN } = require("@openzeppelin/test-helpers");
contract("SimpleStorage", (accounts) => {
  beforeEach(async () => {
    this.simpleStorageInstance = await simpleStorage.deployed();
  });

  it("ça doit stocker 89", async () => {
    const storedData = await this.simpleStorageInstance.get.call();

    // assert.equal(storedData, 89, "La valeur n'est pas 89");
    expect(storedData).to.BN.equal(new BN(89));
  });
});
