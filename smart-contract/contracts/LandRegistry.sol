// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRegistry {
    struct LandParcel {
        uint256 id;
        string location;
        uint256 size;
        address owner;
        bool isRegistered;
    }
    
    // Mapping to store land parcels by ID
    mapping(uint256 => LandParcel) public landParcels;

    // Mapping to check ownership
    mapping(address => uint256[]) public ownerParcels;

    // Variable to generate unique land parcel IDs
    uint256 public nextParcelId;

    // Event to emit when a new land parcel is registered
    event LandParcelRegistered(uint256 id, address owner, string location, uint256 size);

    // Event to emit when a land parcel is updated
    event LandParcelUpdated(uint256 id, string newLocation, uint256 newSize);

    // Event to emit when ownership is transferred
    event OwnershipTransferred(uint256 id, address newOwner);

    // Function to register a new land parcel
    function registerLandParcel(string memory location, uint256 size) public {
        uint256 parcelId = nextParcelId++;
        LandParcel memory newParcel = LandParcel({
            id: parcelId,
            location: location,
            size: size,
            owner: msg.sender,
            isRegistered: true
        });

        landParcels[parcelId] = newParcel;
        ownerParcels[msg.sender].push(parcelId);

        emit LandParcelRegistered(parcelId, msg.sender, location, size);
    }


    // Function to update an existing land parcel
    function updateLandParcel(uint256 parcelId, string memory newLocation, uint256 newSize) public {
        LandParcel storage parcel = landParcels[parcelId];
        require(parcel.isRegistered, "Land parcel not registered");
        require(parcel.owner == msg.sender, "Only the owner can update the land parcel");

        parcel.location = newLocation;
        parcel.size = newSize;

        emit LandParcelUpdated(parcelId, newLocation, newSize);
    }

    // Function to transfer ownership of a land parcel
    function transferOwnership(uint256 parcelId, address newOwner) public {
        LandParcel storage parcel = landParcels[parcelId];
        require(parcel.isRegistered, "Land parcel not registered");
        require(parcel.owner == msg.sender, "Only the owner can transfer ownership");
        require(newOwner != address(0), "Invalid new owner address");

        // Remove parcel from current owner's list
        uint256[] storage ownerParcelList = ownerParcels[msg.sender];
        for (uint256 i = 0; i < ownerParcelList.length; i++) {
            if (ownerParcelList[i] == parcelId) {
                ownerParcelList[i] = ownerParcelList[ownerParcelList.length - 1];
                ownerParcelList.pop();
                break;
            }
        }

        // Add parcel to new owner's list
        ownerParcels[newOwner].push(parcelId);

        // Update the parcel owner
        parcel.owner = newOwner;

        emit OwnershipTransferred(parcelId, newOwner);
    }

    // Get the owner of a land parcel
    function getOwner(uint256 parcelId) external view returns (address) {
        return landParcels[parcelId].owner;
    }

    // Get the details of a land parcel
    function getLandParcelDetails(uint256 parcelId) external view returns (string memory location, uint256 size, address owner) {
        LandParcel memory parcel = landParcels[parcelId];
        return (parcel.location, parcel.size, parcel.owner);
    }
}