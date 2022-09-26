const { expectRevert } = require("@openzeppelin/test-helpers");
const expectEvent = require("@openzeppelin/test-helpers/src/expectEvent");
const { expect } = require("chai");

const voting = artifacts.require("voting.sol");

//Tester tous les requires
//Tester tous les modifiers
//Toutes les fonctions (vérifier les changements de variables avant/après)
//Tester tous les évenements
//Tester les constantes
//Tester les cas d'erreurs pottentiel
//Tester les reverts les cas ou la fonction doit fail
contract("voting", (accounts) => {
  const owner = accounts[0];
  beforeEach(async () => {
    this.votingInstance = await voting.new({ from: owner });
  });

  it("exemple de comment utliser les fonctions pas un vrai test", async () => {
    // let data = await this.votingInstance.voters.call("address");
    // let isRegistered = (await this.votingInstance.voters.call("address"))
    //   .isRegistered;
    //Le await seulement avant l'appel
    // await expectRevert(leNomDeLaFonctionQuiDoitRevert, "");
    // console.log(await this.votingInstance.workflowStatus.call());
    // expect(await this.votingInstance.workflowStatus).to.be.equal(new BN(0));
    // const result = await this.votingInstance.registerVoters(accounts[1], {
    //   from: accounts[5],
    // });
    // expectEvent(result, "VoterRegistered", { _voterAddress: accounts[1] });
  });

  it("ajoute une address à la whitelist", async () => {
    await this.votingInstance.registerVoters(accounts[1], {
      from: owner,
    });

    let isRegistered = (await this.votingInstance.voters.call(accounts[1]))
      .isRegistered;

    console.log(isRegistered);
  });
});
