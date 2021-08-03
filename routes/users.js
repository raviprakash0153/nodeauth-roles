const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticate, permission } = require('../middleware/auth');
const Profile = require('../models/Profile');
const {
  passTokenadmin,
  passTokenuser,
  passTokenemployee,
} = require('../utils/util');

// all users
router.get('/', async (req, res) => {
  try {
    const user1 = await User.find();
    res.json(user1);
  } catch (err) {
    console.log(err);
  }
});

//userby id

// router.get('/:id', async (req, res) => {
//   User.getUserById(req.params.id, (err , ));
//   res.json(user1);
// });

//user by username

//register user
router.post('/register/user', async (req, res) => {
  try {
    const { name, email, username, password, role } = req.body;

    const user = await User.findOne({ email: email });

    console.log(user);

    if (!user) {
      const newUser = new User({
        name,
        email,
        username,
        password,
        role,
      });
      console.log(newUser);
      const hashpass = await bcrypt.hash(newUser.password, 10);

      newUser.password = hashpass;
      newUser.save();

      return res.status(200).json({ msg: 'user registered', user: newUser });
    }
    return res.status(400).json({ msg: 'user already exists', user: user });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

//register admin
router.post('/register/admin', async (req, res) => {
  try {
    const { name, email, username, password, role } = req.body;

    const user = await User.findOne({ email: email });

    console.log(user);

    if (!user) {
      const newUser = new User({
        name,
        email,
        username,
        password,
        role,
      });
      console.log(newUser);
      const hashpass = await bcrypt.hash(newUser.password, 10);

      newUser.password = hashpass;
      newUser.save();

      return res.status(200).json({ msg: 'user registered', user: newUser });
    }
    return res.status(400).json({ msg: 'user already exists', user: user });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

//register user
router.post('/register/employee', async (req, res) => {
  try {
    const { name, email, username, password, role } = req.body;

    const user = await User.findOne({ email: email });

    console.log(user);

    if (!user) {
      const newUser = new User({
        name,
        email,
        username,
        password,
        role,
      });
      console.log(newUser);
      const hashpass = await bcrypt.hash(newUser.password, 10);

      newUser.password = hashpass;
      newUser.save();

      return res.status(200).json({ msg: 'user registered', user: newUser });
    }
    return res.status(400).json({ msg: 'user already exists', user: user });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

//Login User
router.post('/login/user', async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    passTokenuser(req, res, user.role);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

//Login admin
router.post('/login/admin', async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });

    passTokenadmin(req, res, user.role);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

//Login employee
router.post('/login/employee', async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });

    passTokenemployee(req, res, user.role);
  } catch (err) {
    res.status(400).json({ msg: 'Server error' });
  }
});

//profile of users
router.post(
  '/profile/user',
  authenticate,
  permission('user'),
  async (req, res) => {
    const { name, location } = req.body;

    const user = await User.findOne({ _id: req.user.id });
    console.log(user.role);

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        const newProfile = new Profile({
          user: user,
          name: name,
          location: location,
        });
        //create profile
        profile = new Profile(newProfile);
        await profile.save();
        return res.status(201).json({
          msg: 'Profile created',
          profile: profile,
        });
      }
      return res.status(201).json({
        msg: 'Profile already exist ',
        profile: profile,
      });
    } catch (err) {
      res.status(400).json({ msg: 'Server  error' });
    }
  }
);

//profile of users
router.post(
  '/profile/employee',
  authenticate,
  permission('employee'),
  async (req, res) => {
    const { name, location } = req.body;

    const user = await User.findOne({ _id: req.user.id });
    console.log(user.role);

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        const newProfile = new Profile({
          user: user,
          name: name,
          location: location,
        });
        //create profile
        profile = new Profile(newProfile);
        await profile.save();
        return res.status(201).json({
          msg: 'Profile created',
          profile: profile,
        });
      }
      return res.status(201).json({
        msg: 'Profile already exist ',
        profile: profile,
      });
    } catch (err) {
      res.status(400).json({ msg: 'Server  error' });
    }
  }
);

//profile of users
router.post(
  '/profile/admin',
  authenticate,
  permission('admin'),
  async (req, res) => {
    const { name, location } = req.body;

    const user = await User.findOne({ _id: req.user.id });
    console.log(user.role);

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        const newProfile = new Profile({
          user: user,
          name: name,
          location: location,
        });
        //create profile
        profile = new Profile(newProfile);
        await profile.save();
        return res.status(201).json({
          msg: 'Profile created',
          profile: profile,
        });
      }
      return res.status(201).json({
        msg: 'Profile already exist ',
        profile: profile,
      });
    } catch (err) {
      res.status(400).json({ msg: 'Server  error' });
    }
  }
);

//only admin and user can modify not employee
router.put(
  '/profile/todo/user',
  authenticate,
  permission('user', 'admin', 'employee'),
  async (req, res) => {
    try {
      //console.log(req.user.id);
      const user = await User.findOne({ _id: req.user.id });
      if (user.role === 'user') {
        console.log(user.role);
        const profile = await Profile.findOne({ user: req.user.id });

        if (!profile) {
          res.status(400).json({ msg: 'First create profile' });
        }
        const { title, todoDesc } = req.body;

        const newTodo = {
          title,
          todoDesc,
        };
        profile.todo.unshift(newTodo);
        await profile.save();
        //console.log(profile);
        return res.status(200).json({
          msg: `You can add todo as you are ${user.role}`,
          profile: profile,
        });
      }
      const user1 = await User.findOne({ role: 'user' });
      //console.log(user1);
      const profile1 = await Profile.findOne({ user: user1._id });
      return res.status(200).json({
        msg: `As you are in ${user1.role} profile as ${user.role} you can only access or delete task`,
        profile: profile1,
      });
    } catch (err) {
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

//admin PUT task

router.put(
  '/profile/todo/admin',
  authenticate,
  permission('admin'),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      // console.log(profile);

      if (!profile) {
        res.status(400).json({ msg: 'First create profile' });
      }
      const { title, todoDesc } = req.body;

      const newTodo = {
        title,
        todoDesc,
      };
      profile.todo.unshift(newTodo);
      await profile.save();
      //console.log(profile);
      res.status(200).json({ msg: 'You can add todo', profile: profile });
    } catch (err) {
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

//employee PUT
router.put(
  '/profile/todo/employee',
  authenticate,
  permission('employee', 'admin'),
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user.id });
      if (user.role === 'employee') {
        const profile = await Profile.findOne({ user: req.user.id });

        if (!profile) {
          res.status(400).json({ msg: 'First create profile' });
        }
        const { title, todoDesc } = req.body;

        const newTodo = {
          title,
          todoDesc,
        };
        profile.todo.unshift(newTodo);
        await profile.save();
        //console.log(profile);
        return res
          .status(200)
          .json({ msg: 'You can add todo', profile: profile });
      }
      const user1 = await User.findOne({ role: 'employee' });
      const profile1 = await Profile.findOne({ user: user1._id });
      return res.status(200).json({
        msg: `As you are in ${user1.role} profile as ${user.role} you can only access or delete task`,
        profile: profile1,
      });
    } catch (err) {
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

//admin deleteing user todo
router.delete(
  '/profile/todo/user/:todo_id',
  authenticate,
  permission('admin'),
  async (req, res) => {
    try {
      const user1 = await User.findOne({ _id: req.user.id });
      const user = await User.findOne({ role: 'user' });
      const profile = await Profile.findOne({ user: user._id });

      if (!profile) {
        res.status(400).json({ msg: 'profile of user do not exist' });
      }
      // const index = profile.todo.map((item) => item.id);
      const index = profile.todo
        .map((item) => item.id)
        .indexOf(req.params.todo_id);

      console.log(index);
      profile.todo.splice(index, 1);

      await profile.save();
      res.status(400).json({
        msg: `You are logged in as ${user1.role} in ${user.role} profile`,
        profile: profile,
      });
    } catch (err) {
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

//admin deleting employee todo
router.delete(
  '/profile/todo/employee/:todo_id',
  authenticate,
  permission('admin'),
  async (req, res) => {
    try {
      const user1 = await User.findOne({ _id: req.user.id });
      const user = await User.findOne({ role: 'employee' });
      const profile = await Profile.findOne({ user: user._id });

      if (!profile) {
        res.status(400).json({ msg: 'profile of user do not exist' });
      }

      const index = profile.todo
        .map((item) => item.id)
        .indexOf(req.params.todo_id);

      console.log(index);
      profile.todo.splice(index, 1);

      await profile.save();
      res.status(400).json({
        msg: `You are logged in as ${user1.role} in ${user.role} profile`,
        profile: profile,
      });
    } catch (err) {
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

//admin deleting own todo
router.delete(
  '/profile/todo/admin/:todo_id',
  authenticate,
  permission('admin'),
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.id });
      const profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        res.status(400).json({ msg: 'profile of user do not exist' });
      }
      // const index = profile.todo.map((item) => item.id);
      const index = profile.todo
        .map((item) => item.id)
        .indexOf(req.params.todo_id);

      console.log(index);
      profile.todo.splice(index, 1);

      await profile.save();
      res.status(400).json({ msg: 'todo deleted', profile: profile });
    } catch (err) {
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

module.exports = router;
