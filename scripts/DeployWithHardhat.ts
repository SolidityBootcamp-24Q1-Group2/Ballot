import { viem } from "hardhat";
import { toHex } from "viem";
const PROPOSALS = ["Mclaren", "Ham", "Tacos", "Bochito"];

async function main() {
  console.log("Proposals: ");
  PROPOSALS.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });

  const ballotContract = await viem.deployContract("Ballot", [
    PROPOSALS.map((prop) => toHex(prop, { size: 32 })),
  ]);

  console.log("Ballot contract deployed at: ", ballotContract.address);
  return;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
