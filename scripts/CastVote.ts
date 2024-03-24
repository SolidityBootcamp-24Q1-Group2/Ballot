import { getPublicClient, getAccountClient, getContractAddress } from "./utils";
import { abi } from "../artifacts/contracts/Ballot.sol/Ballot.json";
import { hexToString } from "viem";

const getParameters = () => {
  const parameters = process.argv.slice(2);
  if (!parameters || parameters.length < 1)
    throw new Error("Parameters not provided");

  const contractAddress = getContractAddress(parameters[0]);

  const proposalIndex = parameters[1];
  if (isNaN(Number(proposalIndex))) throw new Error("Invalid proposal index");

  return {
    contractAddress,
    proposalIndex
  }
};

async function main() {
  const { contractAddress, proposalIndex } = getParameters();
  const publicClient = getPublicClient('Alchemy')
  const voter = getAccountClient();

  console.log("Proposal selected: ");
  const proposal = (await publicClient.readContract({
    address: contractAddress,
    abi,
    functionName: "proposals",
    args: [BigInt(proposalIndex)],
  })) as any[];
  const name = hexToString(proposal[0], { size: 32 });
  console.log("Voting to proposal", name);

  const hash = await voter.writeContract({
    address: contractAddress,
    abi,
    functionName: "vote",
    args: [BigInt(proposalIndex)],
  });
  console.log("Transaction hash:", hash);
  console.log("Waiting for confirmations...");
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  console.log("Transaction confirmed")
  console.log("Vote added to proposal", name);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});