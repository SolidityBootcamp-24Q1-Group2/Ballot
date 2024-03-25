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

async function queryWinnerName() {
  const { contractAddress } = getParameters();

  const publicClient = getPublicClient("Alchemy");
  console.log("Querying winner name");

  const winner_hex = (await publicClient.readContract({
    address: contractAddress,
    abi,
    functionName: "winnerName",
  })) as `0x${string}`;

  ``;

  console.log(`Winning name: ${hexToString(winner_hex)}`);
}

queryWinnerName().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
