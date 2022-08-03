const express = require('express');

const talkerRouter = express.Router();

const { readTalkers } = require('../utils');

talkerRouter.get('/', async (_req, res) => {
  const talkers = await readTalkers();

  res.status(200).json(talkers);
});

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalkers();

  const talkerById = talkers
    .find((talker) => talker.id === Number(id));

  if (!talkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(talkerById);
});

module.exports = {
  talkerRouter,
};
