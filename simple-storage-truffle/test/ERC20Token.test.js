const ERC20 = artifacts.require("ERC20Token.sol");
const { BN } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

contract("ERC20Token", async (accounts) => {
  const initialSupply = new BN(1000);
  const owner = accounts[0];
  const recipent = accounts[1];

  beforeEach(async () => {
    this.ERC20TokenInstance = await ERC20.new(initialSupply, {
      from: owner,
    });
  });

  it("a un nom", async () => {
    expect(await this.ERC20TokenInstance.name()).to.equal("COURS");
  });
  it("a un symbol", async () => {
    expect(await this.ERC20TokenInstance.symbol()).to.equal("CRS");
  });

  it("on a 18 de decimals", async () => {
    expect(await this.ERC20TokenInstance.decimals()).to.be.bignumber.equal(
      new BN(18)
    );
  });

  it("retourne balanceOf de owner", async () => {
    expect(
      await this.ERC20TokenInstance.balanceOf(owner)
    ).to.be.bignumber.equal(new BN(1000));
  });

  it("fait un transfer", async () => {
    await this.ERC20TokenInstance.tranfer(recipent, 100);
    expect(
      await this.ERC20TokenInstance.balanceOf(owner)
    ).to.be.bignumber.equal(900);
    expect(
      await this.ERC20TokenInstance.balanceOf(recipent)
    ).to.be.bignumber.equal(100);
  });

  it("fait un transferFrom", async () => {
    await this.ERC20TokenInstance.approve(accounts[2], 100, {
      from: owner,
    });
    await this.ERC20TokenInstance.tranferFrom(owner, accounts[3], 100, {
      from: accounts[2],
    });
    expect(
      await this.ERC20TokenInstance.balanceOf(owner)
    ).to.be.bignumber.equal(900);
    expect(
      await this.ERC20TokenInstance.balanceOf(accounts[3])
    ).to.be.bignumber.equal(100);
  });
});
