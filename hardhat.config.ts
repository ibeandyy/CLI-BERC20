import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "@ericxstone/hardhat-blockscout-verify";
import { SOLIDITY_VERSION, EVM_VERSION } from "@ericxstone/hardhat-blockscout-verify";
import './scripts/erc20.task';
import * as dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!PRIVATE_KEY) {
  throw new Error("Please set your PRIVATE_KEY in a .env file");
}

const config: HardhatUserConfig = {
  defaultNetwork: "mynw",
  solidity: {
    compilers: [
      { version: "0.5.16", settings: {} },
      { version: "0.8.17", settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        }
      },
    ]
  },
  networks: {
    mynw: {
      url: "http://127.0.0.1:8545",
      accounts: [PRIVATE_KEY],

      timeout: 100_000,
    },
  },
  namedAccounts: {
    deployer: 0
  },
  blockscoutVerify: {
    blockscoutURL: "http://localhost:4000",
    contracts: {
      "ERC20": {
        compilerVersion: SOLIDITY_VERSION.SOLIDITY_V_8_17,
        optimization: false,
        evmVersion: EVM_VERSION.EVM_BERLIN,
        optimizationRuns: 0,
      },
     
    },
  },
};

export default config;
