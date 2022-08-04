const fs = require('fs/promises');
const crypto = require('crypto');

const readTalkers = async () => {
  const response = await fs.readFile('./talker.json', 'utf-8');
  const data = await JSON.parse(response);

  return data;
};

const writeTalkers = async (talker) => {
  await fs.writeFile('./talker.json', JSON.stringify(talker));
};

const generateToken = () => crypto.randomBytes(8).toString('hex');

module.exports = {
  readTalkers,
  writeTalkers,
  generateToken,
};
