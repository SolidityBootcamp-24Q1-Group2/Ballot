import { expect } from "chai";
import { toHex, hexToString } from "viem";
import { viem } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

const PROPOSALS = ["Chocolate", "Vanilla", "Strawberry"];

async function deployContract() {
  const publicClient = await viem.getPublicClient();
  const [account, otherAccount] = await viem.getWalletClients();
  const propBites = PROPOSALS.map(
    prop => toHex(prop, { size: 32 }));
  const ballotContract = await viem.deployContract('Ballot', [propBites]);

  return {
    ballotContract,
    account,
    otherAccount,
    publicClient, 
}

describe("Ballot", async () => {
  describe("when the contract is deployed", async () => {
    it("has the provided proposals", async () => {
      const { ballotContract } = await loadFixture(deployContract);
      const proposals = await Promise.all([
        ballotContract.read.proposals([0n]),
        ballotContract.read.proposals([1n]),
        ballotContract.read.proposals([2n])
      ]);

      const proposalNames = proposals.map(prop => prop[0].toString());
      const expectedProposals = PROPOSALS.map(prop => toHex(prop, { size: 32 }));

      expect(proposalNames).to.deep.equal(expectedProposals);
    });

    it("has zero votes for all proposals", async () => {
      const { ballotContract } = await loadFixture(deployContract);
      const proposals = await Promise.all([
        ballotContract.read.proposals([0n]),
        ballotContract.read.proposals([1n]),
        ballotContract.read.proposals([2n])
      ]);

      const proposalVotes = proposals.map(prop => prop[1].toString());

      expect(proposalVotes).to.deep.equal(["0", "0", "0"]);
    });

    it("sets the deployer address as chairperson", async () => {
      const { ballotContract, account } = await loadFixture(deployContract);
      const chairperson = await ballotContract.read.chairperson();
      expect(chairperson.toLowerCase()).to.equal(account.account.address);
    });

    it("sets the voting weight for the chairperson as 1", async () => {
      const { ballotContract, account } = await loadFixture(deployContract);
      const chairperson = await ballotContract.read.chairperson();
      const votingWeight = await ballotContract.read.voters([chairperson]);
      
      console.log("votingWeight", votingWeight);
      expect(votingWeight[0]).to.equal(1n);
    });
  });

  describe("when the chairperson interacts with the giveRightToVote function in the contract", async () => {
    it("gives right to vote for another address", async () => {
      const { ballotContract } = await loadFixture(deployContract);

      throw Error("Not implemented");
    });
    it("can not give right to vote for someone that has voted", async () => {
      // TODO
      throw Error("Not implemented");
    });
    it("can not give right to vote for someone that has already voting rights", async () => {
      // TODO
      throw Error("Not implemented");
    });
  });

  describe("when the voter interacts with the vote function in the contract", async () => {
    // TODO
    it("should register the vote", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when the voter interacts with the delegate function in the contract", async () => {
    // TODO
    it("should transfer voting power", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when an account other than the chairperson interacts with the giveRightToVote function in the contract", async () => {
    // TODO
    it("should revert", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when an account without right to vote interacts with the vote function in the contract", async () => {
    // TODO
    it("should revert", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when an account without right to vote interacts with the delegate function in the contract", async () => {
    // TODO
    it("should revert", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interacts with the winningProposal function before any votes are cast", async () => {
    // TODO
    it("should return 0", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interacts with the winningProposal function after one vote is cast for the first proposal", async () => {
    // TODO
    it("should return 0", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interacts with the winnerName function before any votes are cast", async () => {
    // TODO
    it("should return name of proposal 0", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interacts with the winnerName function after one vote is cast for the first proposal", async () => {
    // TODO
    it("should return name of proposal 0", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interacts with the winningProposal function and winnerName after 5 random votes are cast for the proposals", async () => {
    // TODO
    it("should return the name of the winner proposal", async () => {
      throw Error("Not implemented");
    });
  });
});