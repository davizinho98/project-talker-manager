const express = require('express');
const { 
  validateAge, 
  validateRate, 
  validateName, 
  validateTalk, 
  validateWatchedAt, 
} = require('../middlewares/validateDataTalker');
const validateTokenUser = require('../middlewares/validateTokenUser');
const { readTalkers, writeTalkers } = require('../utils');

const talkerRouter = express.Router();

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

talkerRouter
  .post(
    '/',
    validateTokenUser,
    validateName,
    validateAge,
    validateTalk,
    validateWatchedAt,
    validateRate,
    async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talkers = await readTalkers();
  const NEW_TALKER_ID = talkers.length + 1;

  const talkerObj = {
    id: NEW_TALKER_ID,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  await writeTalkers([...talkers, talkerObj]);
  res.status(201).json(talkerObj);
},
);

talkerRouter
  .put(
    '/:id',
    validateTokenUser,
    validateName,
    validateAge,
    validateTalk,
    validateWatchedAt,
    validateRate,
    async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const { id } = req.params;
  const talkers = await readTalkers();
  const talkerIndex = talkers
    .findIndex((talker) => talker.id === Number(id));
  talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk: { watchedAt, rate } };
  await writeTalkers(talkers);

  res.status(200).json(talkers[talkerIndex]);
},
);

talkerRouter.delete('/:id', validateTokenUser, async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalkers();
  const talkerIndex = talkers
    .findIndex((talker) => talker.id === Number(id));
  
  talkers.splice(talkerIndex, 1);
  await writeTalkers(talkers);

  res.status(204).end();
});

module.exports = {
  talkerRouter,
};
