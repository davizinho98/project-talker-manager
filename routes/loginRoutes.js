const express = require('express');
const validateDataUser = require('../middlewares/validateDataUser');
const { generateToken } = require('../utils');

const loginRouter = express.Router();

loginRouter.post('/', validateDataUser, (_req, res) => {
  const tokenObj = { token: generateToken() };

  res.status(200).json(tokenObj);
});

module.exports = {
  loginRouter,
};
