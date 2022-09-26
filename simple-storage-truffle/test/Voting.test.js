const { expectRevert } = require("@openzeppelin/test-helpers");
const expectEvent = require("@openzeppelin/test-helpers/src/expectEvent");
<<<<<<< HEAD
=======
const { BN } = require("@openzeppelin/test-helpers");
>>>>>>> be85c20172bfcee82ccd4999959dc775e2ca882f
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
<<<<<<< HEAD
=======
  const voter1 = accounts[1];
  const voter2 = accounts[2];
  const noVoter = accounts[3];
  const proposalDecription1 = "Proposal 1";
  const proposalDecription2 = "Proposal 2";

  async function expectWorkflowStatus(
    expectedPreviousStatus,
    expectedNewStatus,
    voting,
    callFunction
  ) {
    const receipt = await callFunction({ from: owner });
    const workflowStatus = await voting.workflowStatus.call({ from: owner });
    expect(workflowStatus).to.be.bignumber.equal(new BN(expectedNewStatus));
    expectEvent(receipt, "WorkflowStatusChange", {
      previousStatus: new BN(expectedPreviousStatus),
      newStatus: new BN(expectedNewStatus),
    });
  }

>>>>>>> be85c20172bfcee82ccd4999959dc775e2ca882f
  beforeEach(async () => {
    this.votingInstance = await voting.new({ from: owner });
  });

<<<<<<< HEAD
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
=======
  xcontext("Enregistration des voters", () => {
    it("devrait ajouter un voter", async () => {
      const receipt = await this.votingInstance.registerVoters(voter1, {
        from: owner,
      });
      const voter = await this.votingInstance.voters.call(voter1);

      expect(voter.isRegistered).to.equal(true);
      expectEvent(receipt, "VoterRegistered", { voterAddress: voter1 });
    });

    it("Ne devrait pas ajouter un votant si on est pas l'admin", async () => {
      await expectRevert(
        this.votingInstance.registerVoters(voter2, { from: voter1 }),
        "Ownable: caller is not the owner"
      );
    });

    it("Ne devrait pas ajouter un votant si il est deja enregistré", async () => {
      await this.votingInstance.registerVoters(voter1, {
        from: owner,
      });
      await expectRevert(
        this.votingInstance.registerVoters(voter1, { from: owner }),
        "This address is already in voters"
      );
    });

    it("Ne devrait pas ajouter un votant si le status n'est pas RegisteringVoters", async () => {
      this.votingInstance.startProposalsRegistration({ from: owner });
      await expectRevert(
        this.votingInstance.registerVoters(voter1, { from: owner }),
        "You are not able to do this action right now"
      );
    });
  });

  xcontext("Enregistrement des propositions", () => {
    beforeEach(async () => {
      await this.votingInstance.registerVoters(voter1, { from: owner });
      await this.votingInstance.registerVoters(voter2, { from: owner });
    });

    it("Devrait ajouter une proposition", async () => {
      await this.votingInstance.startProposalsRegistration({ from: owner });
      await this.votingInstance.registerProposals(proposalDecription1, {
        from: voter1,
      });
      const proposal = await this.votingInstance.proposals.call(0);

      expect(proposal.description).to.equal(proposalDecription1);
    });

    it("Ne devrait pas ajouter une proposition si ce n'est pas un voter", async () => {
      await this.votingInstance.startProposalsRegistration({ from: owner });
      await expectRevert(
        this.votingInstance.registerProposals(proposalDecription1, {
          from: owner,
        }),
        "You are not allowed to make a proposal"
      );
    });

    it("Ne devrait pas ajouter une proposition si le workflow n'est pas à registeringVoters", async () => {
      await this.votingInstance.startProposalsRegistration({ from: owner });
      await this.votingInstance.endProposalsRegistration({ from: owner });
      await expectRevert(
        this.votingInstance.registerProposals(proposalDecription1, {
          from: owner,
        }),
        "You are not able to do this action right now"
      );
    });
  });

  xcontext("Session de vote", () => {
    beforeEach(async () => {
      await this.votingInstance.registerVoters(voter1, { from: owner });
      await this.votingInstance.startProposalsRegistration({ from: owner });
      await this.votingInstance.registerProposals(proposalDecription1, {
        from: voter1,
      });
      await this.votingInstance.endProposalsRegistration({ from: owner });
    });

    it("devrait mettre un vote", async () => {
      await this.votingInstance.startVotingSession({ from: owner });
      const receipt = await this.votingInstance.vote(0, { from: voter1 });
      const voter = await this.votingInstance.voters.call(voter1);
      const proposal = await this.votingInstance.proposals.call(0);

      expect(voter.votedProposalId).to.be.equal(new BN(0));
      expect(voter.hasVoted).to.be.true;
      expect(proposal.description).to.be.equal(proposalDecription1);
      expect(proposal.voteCount).to.be.equal("1");
      expectEvent(receipt, "Voted", { voter: voter1, proposalId: new BN(0) });
    });

    it("Ne devrait pas mettre de vote si ce n'est pas un voteur", async () => {
      await this.votingInstance.startVotingSession({ from: owner });

      await expectRevert(
        this.votingInstance.vote(0, { from: noVoter }),
        "You are not allowed to vote"
      );
    });

    it("Ne devrait pas mettre une vote si la session n'est pas a voting start", async () => {
      await expectRevert(
        this.votingInstance.vote(0, { from: noVoter }),
        "You are not able to do this action right now"
      );

      it("Ne devrait pas mettre un vote si il a deja voter", async () => {
        await this.votingInstance.startVotingSession({ from: owner });
        await this.votingInstance.vote(0, { from: voter1 });

        await expectRevert(
          this.votingInstance.vote(0, { from: voter1 }),
          "You have already voted"
        );
      });
    });
  });

  context("Trie des votes", () => {
    it("devrait commencer l'enregistrement des propositions", async () => {
      expectWorkflowStatus(
        voting.WorkflowStatus.RegisteringVoters,
        voting.WorkflowStatus.ProposalsRegistrationStarted,
        this.votingInstance,
        this.votingInstance.startProposalsRegistration
      );
    });

    it("devrait ne pas commencer l'eregistrement des propositions", async () => {
      await expectRevert(
        this.votingInstance.startProposalsRegistration({ from: voter1 }),
        "Ownable: caller is not the owner"
      );
    });

    it("devrait ne pas commencer l'enregistrement des propositions si le workflow status est pas a RegisteringVoters", async () => {
      await this.votingInstance.startProposalsRegistration({ from: owner });
      await this.votingInstance.endProposalsRegistration({ from: owner });
      await expectRevert(
        this.votingInstance.startProposalsRegistration({ from: owner }),
        "You are not able to do this action right now"
      );
    });

    it("devrait terminer l'enregistrement des propositions", async () => {
      await this.votingInstance.startProposalsRegistration();
      expectWorkflowStatus(
        Voting.WorkflowStatus.ProposalsRegistrationStarted,
        Voting.WorkflowStatus.ProposalsRegistrationEnded,
        this.votingInstance,
        this.votingInstance.endProposalsRegistration
      );
    });

    it("devrait ne pas terminé l'enregistrement des propositions if the workflow status is not set at ProposalREgistrationStarted", async () => {
      await expectRevert(
        this.votingInstance.endProposalsRegistration(),
        "You are not able to do this action right now"
      );
    });
    it("devrait commencer la session", async function () {
      await this.votingInstance.startProposalsRegistering();
      await this.votingInstance.endProposalsRegistering();

      expectWorkflowStatus(
        Voting.WorkflowStatus.ProposalsRegistrationEnded,
        Voting.WorkflowStatus.VotingSessionStarted,
        this.votingInstance,
        this.votingInstance.startVotingSession
      );
    });

    it("ne de vrait pas commencer la session l'utilisateur n'est pas l'owner", async function () {
      await this.votingInstance.startProposalsRegistering();
      await this.votingInstance.endProposalsRegistering();
      await expectRevert(
        this.votingInstance.startVotingSession({ from: voter1 }),
        "Ownable: caller is not the owner"
      );
    });

    it("ne devrait pas commencer le session le work status n'est pas le bon", async () => {
      await expectRevert(
        this.votingInstance.endVotingSession(),
        "You are not able to do this action right now."
      );
    });

    it("ne devrait pas commencer la session ce n'est pas l'admin", async () => {
      await this.votingInstance.startProposalsRegistering();
      await this.votingInstance.endProposalsRegistering();
      await this.votingInstance.startVotingSession();
      await this.votingInstance.endVotingSession({ from: owner });

      expectWorkflowStatus(
        Voting.WorkflowStatus.VotingSessionEnded,
        Voting.WorkflowStatus.VotesTallied,
        this.votingInstance,
        this.votingInstance.votesTallied
      );
    });
>>>>>>> be85c20172bfcee82ccd4999959dc775e2ca882f
  });
});
