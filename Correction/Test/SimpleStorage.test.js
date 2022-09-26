const SimpleStorage = artifacts.require("./SimpleStorage.sol");

contract("SimpleStorage", (accounts) => {
  beforeEach(async () => {
    this.simpleStorageInstance = await SimpleStorage.new();

    this.simpleStorageInstance = await SimpleStorage.deployed();
  });

  it("...devrait store 89.", async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();

    // Set value of 89
    await simpleStorageInstance.set(89, { from: accounts[0] });

    // Get stored value
    const storedData = await simpleStorageInstance.get.call();

    assert.equal(storedData, 89, "The value 89 was not stored.");
  });

  it("On attend que storedData soit égal à 89", async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();
    await simpleStorageInstance.set(89, { from: accounts[0] });
    const storedData = await simpleStorageInstance.get.call();

    expect(storedData).to.be.bignumer.equal(new BN(89));
  });
});
