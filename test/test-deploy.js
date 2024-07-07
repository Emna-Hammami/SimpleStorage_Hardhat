const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

// describe("SimpleStorage", () => {});
describe("SimpleStorage", function() {
    let simpleStorageFactory, simpleStorage;
    beforeEach(async function(){
        // deploy our SimpleStorage contract
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
    })

    // inside the it() --> describe the test and what should the test do
    it("Should start with a favorite number of 0", async function() {
        const currentValue = await simpleStorage.retrieve();
        const expectedValue = "0";
        assert.equal(currentValue.toString(), expectedValue);
        // expect(currentValue.toString()).to.equal(expectedValue);
    });

    it.only("Should update when we call store", async function(){
        const expectedValue = "7";
        const trxResponse = await simpleStorage.store(expectedValue);
        await trxResponse.wait(1);

        const currentValue = await simpleStorage.retrieve();
        assert.equal(currentValue.toString(), expectedValue);
    })
});
