const jwt = require('jsonwebtoken');
const User = require('../model/User'); 
require('dotenv').config();
const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'unauthorized '});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

const checkAdmin = async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  if (user && user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: "User not authorised" });
  }
};

module.exports = { auth, checkAdmin };
