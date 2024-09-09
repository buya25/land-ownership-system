const express = require('express');
const { registerCtrl, loginCtrl, checkAuthCtrl } = require('../controllers/authController');
const authRouter = express.Router();

// Register route
authRouter.post('/register', registerCtrl);

// Login route
authRouter.post('/login', loginCtrl);

authRouter.get('/check-auth', checkAuthCtrl);

module.exports = authRouter;