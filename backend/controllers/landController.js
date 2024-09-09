// backend/controllers/landParcelController.js

const LandParcel = require("../models/LandParcel");
const {
  registerLandParcel,
  updateLandParcelScript,
} = require("../services/contractService");

/**
 * Register  a new land parcel from the example file
 * **/
const exampleParcel = async (req, res, next) => {
  try {
    const { location, size, units, parcelId, username, userId, email } =
      req.body;

    // Ensure that size is numeric and handle the units separately
    const numericSize = parseInt(size, 10); // Convert size to a number
    if (isNaN(numericSize)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid size value" });
    }

    // Optionally handle units
    const sizeWithUnits = `${numericSize} ${units || "sq ft"}`;

    // Call the registerLandParcel function with the numeric size
    const result = await registerLandParcel(location, numericSize);

    // Check if the registration was successful
    if (result.success) {
      // Save to MongoDB
      const newParcel = new LandParcel({
        parcelId: parcelId,
        location,
        size: sizeWithUnits,
        userId: userId, // Store the user ID as the owner
        username: username,
        email: email,
        transactionCode: result.transactionHash, // Assuming the transaction hash is used as a unique ID for the parcel
        isRegistered: true,
        dateRegistered: new Date(), // Add the current date
      });

      await newParcel.save();

      res
        .status(200)
        .json({ success: true, transactionHash: result.transactionHash });
    } else {
      res.json({ success: false, error: result.error });
      next();
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    next();
  }
};

const exampleAllParcelDetails = async (req, res, next) => {
  try {
    // Query MongoDB to get all land parcel details
    const parcelDetails = await LandParcel.find({});

    if (!parcelDetails) {
      res.status(404).json({ error: "No land parcel found" });
    }

    res.json(200, { details: parcelDetails });
  } catch (error) {
    console.log(`Error getAllParcelDetails : ${error.message}`);
    next();
  }
};

/**
 *
 * DO NOT CHANGE THE CODE UNLESS ITS WORKING
 *
 * **/

const registerParcel = async (req, res, next) => {
  try {
    const { location, size, units } = req.body;

    // Ensure that size is numeric and handle the units separately
    const numericSize = parseInt(size, 10); // Convert size to a number
    if (isNaN(numericSize)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid size value" });
    }

    // Optionally handle units
    const sizeWithUnits = `${numericSize} ${units || "sq ft"}`;

    // Call the registerLandParcel function with the numeric size
    const result = await registerLandParcel(location, numericSize);

    //check if the registration was successfull
    if (result.success) {
      // Save to MongoDB
      const newParcel = new LandParcel({
        location,
        size: size,
      });
      await newParcel.save();

      res.json({ success: true, transactionHash: newParcel });
    } else {
      res.json({ success: false, error: result.error });
      next();
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    next();
  }
};

/**
 * Update an existing land parcel
 * **/
const updateLandParcel = async (req, res, next) => {
  try {
    // Retrieve the parcelId from the request parameters
    const parcelId = req.params.id;

    // Fetch the existing land parcel
    const existingParcel = await LandParcel.findById(parcelId);
    if (!existingParcel) {
      return res
        .status(404)
        .json({ success: false, error: "Land parcel not found" });
    }

    // Extract data from request body
    const { location, size } = req.body;

    // Validate size
    if (isNaN(size)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid size value" });
    }

    // Update the land parcel in the smart contract
    const contractUpdate = await updateLandParcelScript(
      parcelId,
      location,
      size
    );
    if (!contractUpdate.success) {
      return res
        .status(500)
        .json({ success: false, error: contractUpdate.error });
    }

    // Update the land parcel in MongoDB
    const updatedParcel = await LandParcel.findByIdAndUpdate(
      parcelId,
      { location: location, size: size },
      { new: true } // Return the updated document
    );

    // Check if the update was successful
    if (!updatedParcel) {
      return res
        .status(404)
        .json({ success: false, error: "Land parcel not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Land parcel updated successfully",
        updatedParcel,
      });
  } catch (error) {
    console.error("Error updating land parcel:", error.message); // Log only the message
    res.json(500, { success: false, error: "Server error" });
    next();
  }
};

/**
 * Transfer ownership of a land parcel
 * **/
const transferOwnership = async (req, res, next) => {
  try {
    // Retrieve the parcelId from the request parameters
    const parcelId = req.params.id;
    console.log("Parcel ID:", parcelId);

    // Extract newOwner from request body
    const { newOwner } = req.body;

    if (!newOwner) {
      return res
        .status(400)
        .json({ success: false, error: "The Name of the owner is required" });
    }

    // Fetch the existing land parcel
    const existingParcel = await LandParcel.findById(parcelId);
    if (!existingParcel) {
      return res
        .status(404)
        .json({ success: false, error: "Land parcel not found" });
    }

    console.log(
      "existing land parcel: ",
      existingParcel.location,
      " ",
      existingParcel.size
    );

    // Update the land parcel in the smart contract
    const contractUpdate = await updateLandParcelScript(
      parcelId,
      existingParcel.location,
      existingParcel.size,
      newOwner
    );
    if (!contractUpdate.success) {
      return res
        .status(500)
        .json({ success: false, error: contractUpdate.error });
    }

    const username = newOwner;
    // Update the land parcel owner in MongoDB
    const updatedParcel = await LandParcel.findByIdAndUpdate(
      parcelId,
      { username: username },
      { new: true } // Return the updated document
    );

    if (!updatedParcel) {
      return res
        .status(404)
        .json({ success: false, error: "Land parcel not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Ownership transferred successfully",
        updatedParcel,
        transactionHash: contractUpdate.transactionHash,
      });
  } catch (error) {
    console.error("Error transferring ownership:", error.message);
    res.status(500).json({ success: false, error: "Server error" });
    next();
  }
};

// Get the owner of a land parcel
const getOwnerLand = async (req, res, next) => {
  const parcelId = parseInt(req.params.id);

  try {
    res.status(200).json({ owner: parcelId });
  } catch (error) {
    console.log(`Error getOwnerLand : ${error.message}`);
    next();
  }
};

// Count the number of parcels
const countParcels = async (req, res, next) => {
  try {
    const count = await LandParcel.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.log(`Error countParcels : ${error.message}`);
    next();
  }
};

/**
 *
 * Get details of a land parcel
 *
 * **/
const getLandParcelDetails = async (req, res, next) => {
  try {
    // Extract parcelId from URL parameters and convert to ObjectId
    const parcelId = req.params.id;
    console.log("Parcel ID:", parcelId);

    // Query MongoDB to get land parcel details
    const parcelDetails = await LandParcel.findById(parcelId);

    if (parcelDetails) {
      // Return parcel details if found
      res.status(200).json({ details: parcelDetails });
    } else {
      // Handle case where parcel is not found
      res.status(404).json({ error: "Land parcel not found" });
    }
  } catch (error) {
    // Handle any errors that occur during the query
    console.error("Error retrieving land parcel details:", error.message);
    res.json(500, { error: "Server error" }, error.message);
    next();
  }
};

const getAllParcelDetails = async (req, res, next) => {
  try {
    // Query MongoDB to get all land parcel details
    const parcelDetails = await LandParcel.find({});

    if (!parcelDetails) {
      res.status(404).json({ error: "No land parcel found" });
    }

    res.json(200, { details: parcelDetails });
  } catch (error) {
    console.log(`Error getAllParcelDetails : ${error.message}`);
    next();
  }
};

module.exports = {
  registerParcel,
  getOwnerLand,
  transferOwnership,
  updateLandParcel,
  getLandParcelDetails,
  getAllParcelDetails,
  countParcels,
  
  exampleParcel,
  exampleAllParcelDetails,
};
