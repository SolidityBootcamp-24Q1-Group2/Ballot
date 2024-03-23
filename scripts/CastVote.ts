import { getPublicClient, getAccountClient } from "./utils";
import { abi, bytecode } from "../artifacts/contracts/Ballot.sol/Ballot.json";
import { formatEther, hexToString } from "viem";


const getContractAddress = (parameters: string[]): `0x${string}` => {
  const contractAddress = parameters[0] as `0x${string}`;
  if (!contractAddress) throw new Error("Contract address not provided");
  if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress))
    throw new Error("Invalid contract address");

  return contractAddress;
};

const getProposalIndex = (parameters: string[]) => {
  const proposalIndex = parameters[1];
  if (isNaN(Number(proposalIndex))) throw new Error("Invalid proposal index");

  return proposalIndex;
}

async function main() {
  const parameters = process.argv.slice(2);
  if (!parameters || parameters.length < 1)
    throw new Error("Parameters not provided");

  const contractAddress = getContractAddress(parameters);
  const proposalIndex = getProposalIndex(parameters);

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
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});