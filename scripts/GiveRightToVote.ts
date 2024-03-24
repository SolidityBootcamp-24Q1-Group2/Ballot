import { getPublicClient, getAccountClient, getContractAddress } from "./utils";
import { abi } from "../artifacts/contracts/Ballot.sol/Ballot.json";

const getParameters = () => {
  const parameters = process.argv.slice(2);
  if (!parameters || parameters.length < 2)
    throw new Error("Parameters not provided");

  const contractAddress = getContractAddress(parameters[0]);

  const voter = parameters[1];
  if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress))
    throw new Error("Invalid contract address");

  return {
    contractAddress,
    voter
  }
}

async function main() {
  const { contractAddress, voter } = getParameters();

  const publicClient = getPublicClient('Alchemy')
  const deployer = getAccountClient();

  console.log("Adding right to vote to address", voter);

  const hash = await deployer.writeContract({
    address: contractAddress,
    abi,
    functionName: "giveRightToVote",
    args: [voter]
  });

  console.log("Transaction hash: ", hash);
  console.log("Waiting for confirmations");
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  console.log("Transaction confirmed")
  console.log("Right to vote added to address", voter); 
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});