// routes/landRoutes.js
const express = require('express');
const { registerParcel, getOwnerLand,
     transferOwnership, updateLandParcel,
      getLandParcelDetails, 
      getAllParcelDetails,
      exampleParcel,
      exampleAllParcelDetails,
      countParcels} = require('../controllers/landController');
const landRoutes = express.Router();

// Define routes
landRoutes.post('/register', registerParcel);

landRoutes.get('/owner/:id', getOwnerLand);

landRoutes.post('/transfer/:id', transferOwnership);

landRoutes.post('/update/:id', updateLandParcel);

landRoutes.get('/details/:id', getLandParcelDetails);

landRoutes.get('/viewAll', getAllParcelDetails);

landRoutes.get('/count', countParcels);


/**
 * TESTING METHODS
 * **/
landRoutes.post('/example/register', exampleParcel);

landRoutes.get('/example/viewAll', exampleAllParcelDetails);

module.exports = landRoutes;
