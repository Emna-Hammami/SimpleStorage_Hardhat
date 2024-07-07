const { ethers, run, network } = require("hardhat");

/*async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    console.log("Deploying contract __________________");
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.deployed();
}*/

async function main() {
    //const [deployer] = await ethers.getSigners();
    //console.log("Deploying contracts with the account:", deployer.address);

    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    console.log("Deploying contract ____________");
    const simpleStorage = await SimpleStorage.deploy();
  
    //console.log("SimpleStorage deployed to:", simpleStorage.address);

    //console.log(network.config);
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY ) {
        await simpleStorage.deploymentTransaction().wait(6); //wait 6 blocks before verifying the contract
        await verify(simpleStorage.target, []);
    }

    // Interacting with Contracts in Hardhat
    const currentValue = await simpleStorage.retrieve();
    console.log(`Current Value is: ${currentValue}`);

    const trxResponse = await simpleStorage.store(7);// Update the current value
    await trxResponse.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    console.log(`Updated Value is: ${updatedValue}`);
  }

  // verify function uses the verify task
  async function verify(contractAddress, args) {
    console.log("Verifying contract _______________");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch(err) {
        if (err.message.toLowerCase().includes("already verified")) {
            console.log("Contract already verified !");
        } else {
            console.log(err);
        }
    }
  }

main().then(() => process.exit(0)).catch((err) => {
    console.error(err);
    process.exit(1);
});