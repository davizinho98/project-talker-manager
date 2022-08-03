const express = require('express');
const { generateToken } = require('../utils');

const loginRouter = express.Router();

loginRouter.post('/', (_req, res) => {
  /* const { email, password } = req.body; */
  const tokenObj = { token: generateToken() };

  res.status(200).json(tokenObj);
});

module.exports = {
  loginRouter,
};
