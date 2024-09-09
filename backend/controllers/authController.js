const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AppErr } = require('../utils/appErr');

const registerCtrl = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      throw new AppErr('Email already exists', 400);
    }else{
      user = new User({ name, email, password, role });
      await user.save();
    }

    res.status(201).json({name: user.name });
  } catch (error) {
    console.log(`Error in user register controller : ${error.message}`);
    next(error);
  }
};

const loginCtrl = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const checkAuthCtrl = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id);
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    res.status(200).json({ isLoggedIn: true, user: { id: user.id, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Failed to verify token' });
    next();
  }
};

module.exports = { registerCtrl, loginCtrl,  checkAuthCtrl };
