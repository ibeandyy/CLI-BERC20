import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
task("deployBERC20", "Deploy an BERC20 token contract")
  .addParam("name", "Token name")
  .addParam("symbol", "Token symbol")
  .addParam("totalSupply", "Token total supply")
  .addParam("decimals", "Token decimals")
  .setAction(async (args, hre) => {
    const { name, symbol, totalSupply, decimals } = args;

    if (!name || !symbol || !totalSupply || !decimals) {
      console.error("Error: Missing one or more required parameters.");
      console.log("Usage: npx hardhat deploy:erc20 --name <name> --symbol <symbol> --totalSupply <totalSupply> --decimals <decimals>");
      return;
    }

    const parsedDecimals = parseInt(decimals);
    if (isNaN(totalSupply) || totalSupply <0 || totalSupply > 1e18)
    if (isNaN(parsedDecimals) || parsedDecimals < 0 || parsedDecimals > 18) {
      console.error("Error: Invalid decimals value. Decimals must be a number between 0 and 18.");
      return;
    }

    const [deployer] = await hre.ethers.getSigners();

    console.log(`Deploying contracts with the account ${deployer.address}` );

    const Token = await hre.ethers.getContractFactory("BERC20");
    const token = await Token.deploy(name, symbol, hre.ethers.BigNumber.from(totalSupply), parsedDecimals);

    console.log(`Token deployed to ${token.address}`);
  });

task("balanceERC20", "Prints all account balances of ERC20 token")
  .addOptionalParam("contract", "The token address", "")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    const { deployments, ethers } = hre;
    const accs = await ethers.getSigners();
    let contractAddress = taskArgs.contract;
    if (contractAddress == "") {
      const d = await deployments.get("BERC20");
      contractAddress = d.address;
    }
    const fac = await ethers.getContractFactory("BERC20");
    const c = fac.attach(contractAddress);
    for (const acc of accs) {
      const balance = await c.balanceOf(acc.address);
      console.log(acc.address, ":", ethers.utils.formatEther(balance), "TTK");
    }
  });

task("transferERC20", "Transfer ERC20 token")
  .addParam("from", "sender address")
  .addParam("to", "receiver address")
  .addParam("amount", "transfer amount (in TTK)")
  .addOptionalParam("contract", "The token address", "")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    const { deployments, ethers } = hre;
    const signer = await ethers.getSigner(taskArgs.from);
    let contractAddress = taskArgs.contract;
    if (contractAddress == "") {
      const d = await deployments.get("BERC20");
      contractAddress = d.address;
    }
    const fac = await ethers.getContractFactory("BERC20");
    const c = fac.attach(contractAddress).connect(signer);
    const res = await c.transfer(taskArgs.to, ethers.utils.parseEther(taskArgs.amount));
    console.log(res);
  });