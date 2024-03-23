# Ballot Project

Before execute any scripts be sure create a `.env` file and add your

```
PRIVATE_KEY = ''
ALCHEMY_API_KEY=""
```

## Deploy

Deploy with hardhat

```bash
npm run compile
npm run deploy:hardhat
```

Deploy with Viem

```bash
npm run compile
npm run deploy:viem <PROPOSAL_1> <PROPOSAL_N>
```

See your contract deployed in:

```
https://sepolia.etherscan.io/address/<CONTRACT_ADDRESS>
```
