const fs = require('fs/promises');
const crypto = require('crypto');

const readTalkers = async () => {
  const response = await fs.readFile('./talker.json', 'utf-8');
  const data = await JSON.parse(response);

  return data;
};

const generateToken = () => crypto.randomBytes(8).toString('hex');

module.exports = {
  readTalkers,
  generateToken,
};
