const fs = require('fs/promises');

const readTalkers = async () => {
  const response = await fs.readFile('./talker.json', 'utf-8');
  const data = await JSON.parse(response);

  return data;
};

module.exports = {
  readTalkers,
};
