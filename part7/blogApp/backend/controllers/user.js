const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { likes: 0, user: 0 });
  response.json(users);
});

userRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body;
    const saltRounds = 10;

    if (!(username && password)) { return response.status(400).json({ error: 'Username and password required' }).end(); }

    if (!(username.length > 3) || !(password.length > 3)) { return response.status(400).json({ error: 'Username and password length should be more than 3 characters' }).end(); }

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });
    const savedUser = await user.save();
    return response.status(201).json(savedUser);
  } catch (error) {
    return next(error);
  }
});

module.exports = userRouter;
