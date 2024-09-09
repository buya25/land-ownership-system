(async () => {
    // Import required modules
    const { expect } = await import('chai');
    const { ethers } = await import('hardhat');

    describe("LandRegistry", function () {
        let LandRegistry, landRegistry, owner, addr1, addr2;

        beforeEach(async function () {
            LandRegistry = await ethers.getContractFactory("LandRegistry");
            [owner, addr1, addr2] = await ethers.getSigners();
            landRegistry = await LandRegistry.deploy();
            await landRegistry.deployed();
        });

        it("Should allow a user to register a land parcel", async function () {
            await landRegistry.connect(addr1).registerLandParcel("123 Main St", 100);
            const parcel = await landRegistry.landParcels(0);

            console.log('Registered Parcel:', parcel);

            expect(parcel.id.toNumber()).to.equal(0); // Convert BigNumber to number
            expect(parcel.location).to.equal("123 Main St");
            expect(parcel.size.toNumber()).to.equal(100); // Convert BigNumber to number
            expect(parcel.owner).to.equal(addr1.address);
        });

        it("Should allow the owner to update a land parcel", async function () {
            await landRegistry.connect(addr1).registerLandParcel("123 Main St", 100);
            await landRegistry.connect(addr1).updateLandParcel(0, "456 Elm St", 200);
            const parcel = await landRegistry.landParcels(0);

            console.log('Updated Parcel:', parcel);

            expect(parcel.location).to.equal("456 Elm St");
            expect(parcel.size.toNumber()).to.equal(200); // Convert BigNumber to number
        });

        it("Should not allow a non-owner to update a land parcel", async function () {
            await landRegistry.connect(addr1).registerLandParcel("123 Main St", 100);

            await expect(
                landRegistry.connect(addr2).updateLandParcel(0, "789 Oak St", 300)
            ).to.be.revertedWith("Only the owner can update the land parcel");
        });

        it("Should revert if updating a non-existent land parcel", async function () {
            await expect(
                landRegistry.connect(addr1).updateLandParcel(1, "789 Oak St", 300)
            ).to.be.revertedWith("Land parcel not registered");
        });
    });
})();
