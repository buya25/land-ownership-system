const mongoose = require('mongoose');

const landParcelSchema = new mongoose.Schema({
    parcelId: { type: String },
    location: { type: String },
    size: { type: String },  // Size with units
    username: {type: String},
    userId: {type: String},
    transactionCode: { type: String }, // New field for transaction code
    dateRegistered: { type: Date, default: Date.now }, // New field for registration date
    email: { type: String }, // New field for owner's email
    isRegistered: { type: Boolean, default: true }
});

const LandParcel = mongoose.model('LandParcel', landParcelSchema);

module.exports = LandParcel;
