import { getPublicClient, getAccountClient, getContractAddress } from "./utils";
import { abi } from "../artifacts/contracts/Ballot.sol/Ballot.json";

const getParameters = () => {
  const parameters = process.argv.slice(2);
  if (!parameters || parameters.length < 2)
    throw new Error("Parameters not provided");

  const contractAddress = getContractAddress(parameters[0]);

  const delegate_to_address = parameters[1];
  if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress))
    throw new Error("Invalid contract address");

  return {
    contractAddress,
    delegate_to_address,
  };
};

async function main() {
  const { contractAddress, delegate_to_address } = getParameters();

  const publicClient = getPublicClient("Alchemy");
  const deployer = getAccountClient();

  console.log("Delegating vote");

  const hash = await deployer.writeContract({
    address: contractAddress,
    abi,
    functionName: "delegate",
    args: [delegate_to_address],
  });

  console.log("Transaction hash: ", hash);
  console.log("Waiting for confirmations");
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  console.log("Transaction confirmed");
  console.log("Your vote was delegated to: ", delegate_to_address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
