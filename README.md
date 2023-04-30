# We Make Da Tokens
Create BERC20 tokens via CLI.

## How to use
Follow the guide [here](https://github.com/TrustlessComputer/trustless-node-easy) to install a TC node.
Clone repository from github
run `npm install`
rename `.env.example` to `.env`, add the deployer private key (must be funded with TC.)

## To Deploy Token
run `npx hardhat deploy:erc20 --name <name> --symbol <symbol> --totalSupply <totalSupply> --decimals <decimals>`

#### Notes 
totalSupply must be <1e18
decimals must be > 0 <= 18
Name/symbol must be specified
token is minted out to deployer with no minting or burning functionality. 

## To Verify Contract:

```bash
npx hardhat blockscout-verify contracts/ERC20.sol <your-deployed-address>

```
## To Get Account Balances
```bash
npx hardhat balanceERC20
```
## To Transfer Tokens
```bash
npx hardhat transferERC20 --from <your-address> --amount 0.1 --to <your-address>
```




