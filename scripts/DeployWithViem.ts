import { formatEther, toHex } from "viem";
import { abi, bytecode } from "../artifacts/contracts/Ballot.sol/Ballot.json";
import { getPublicClient, getAccountClient } from "./utils";


async function main() {
  const proposals = process.argv.slice(2);
  if (!proposals || proposals.length < 1)
    throw new Error("Proposals not provided");

  const publicClient = getPublicClient('Alchemy')
  const deployer = getAccountClient();

  const balance = await publicClient.getBalance({ address: deployer.account.address });
  console.log("Deployer Balance: ", formatEther(balance), deployer.chain.nativeCurrency.symbol);

  console.log("Deploying Ballot contract");
  const hash = await deployer.deployContract({
    abi,
    bytecode: bytecode as `0x${string}`,
    args: [proposals.map(prop => toHex(prop, { size: 32}))]
  });

  console.log("Transaction hash: ", hash);
  console.log("Waiting for confirmations");

  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  console.log("Contract deployed at: ", receipt.contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});