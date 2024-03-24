async function queryWinnerName() {
  console.log("Querying winner name")

  // TODO
}

queryWinnerName().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});