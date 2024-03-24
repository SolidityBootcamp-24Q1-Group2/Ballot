async function queryWinningProposal() {
  console.log("Querying winning proposal")

  // TODO
}

queryWinningProposal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});