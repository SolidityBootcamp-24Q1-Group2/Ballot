import { getPublicClient, getContractAddress } from "./utils";
import { abi } from "../artifacts/contracts/Ballot.sol/Ballot.json";
import { hexToString } from "viem";

const getParameters = () => {
  const parameters = process.argv.slice(1);

  if (!parameters || parameters.length < 1)
    throw new Error("Parameters not provided");

  const contractAddress = getContractAddress(parameters[1]);

  return {
    contractAddress,
  };
};
async function queryWinningProposal() {
  const { contractAddress } = getParameters();  
  const publicClient = getPublicClient("Alchemy");
  
  console.log("Querying winning proposal");

  const winningProposal = (await publicClient.readContract({
    address: contractAddress,
    abi,
    functionName: "winningProposal",
  })) as `0x${string}`;

  console.log(`Winning proposal: ${winningProposal}`);
}

queryWinningProposal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});