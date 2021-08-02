const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const passTokenadmin = async (req, res, role) => {
  if (role === 'admin') {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    console.log(user);
    if (!user) {
      res.status(400).json({ msg: 'user do not exist' });
    }
    console.log(user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (isMatch) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: 604800,
      });

      console.log(token);
      return res
        .status(200)
        .json({ msg: `Logged in as ${user.role}`, token: token });
    }
  } else {
    return res.status(400).json({
      msg: `You cannot acess admin credentials as you are ${role} `,
    });
  }

  // res.cookie('jwt', token);
};

//pass Token for user
const passTokenuser = async (req, res, role) => {
  // const user = await User.findOne({ username });
  if (role === 'user' || role === 'admin' || role === 'employee') {
    const { username, password } = req.body;
    //permission('admin');
    const user = await User.findOne({ username: username });
    console.log(user);
    if (!user) {
      res.status(400).json({ msg: 'user do not exist' });
    }
    console.log(user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (isMatch) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: 604800,
      });

      console.log(token);
      return res
        .status(200)
        .json({ msg: `Logged in as ${user.role}`, token: token });
    }
  }

  // res.cookie('jwt', token);
};

//pass Token for user
const passTokenemployee = async (req, res, role) => {
  // const user = await User.findOne({ username });
  if (role === 'admin' || role === 'employee') {
    const { username, password } = req.body;
    //permission('admin');
    const user = await User.findOne({ username: username });
    console.log(user);
    if (!user) {
      res.status(400).json({ msg: 'user do not exist' });
    }
    console.log(user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (isMatch) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: 604800,
      });

      console.log(token);
      return res
        .status(200)
        .json({ msg: `Logged in as ${user.role}`, token: token });
    }
  } else {
    return res.status(403).json({
      msg: `You cannot access employee page as you are ${role} `,
    });
  }

  // res.cookie('jwt', token);
};

module.exports = { passTokenadmin, passTokenuser, passTokenemployee };
