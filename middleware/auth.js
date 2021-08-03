const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('token');
    const verifiedUser = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = verifiedUser;
    //console.log(req.user);
    next();
  } catch (err) {
    res.status(400).json({ msg: 'token not valid' });
  }
};

const permission = (...roles) => {
  return async (req, res, next) => {
    const user = await User.findOne({ _id: req.user.id });

    // console.log(user);
    try {
      if (!roles.includes(user.role)) {
        return res
          .status(400)
          .json({ msg: `You do not have permission as you are ${user.role}` });
      }
    } catch (err) {
      res.status(500).json({ msg: 'Server error', error: err });
    }
    next();
  };
};

module.exports = { authenticate, permission };
