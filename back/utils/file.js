const { readFile, writeFile } = require('fs/promises');

exports.getPerson = async () => {
  const data = await readFile('dbs/person.json');
  return JSON.parse(data);
};

exports.savePerson = data => writeFile('dbs/person.json', JSON.stringify(data));

exports.getRequest = async () => {
  const data = await readFile('dbs/request.json');
  return JSON.parse(data);
};

exports.saveRequest = data => writeFile('dbs/request.json', JSON.stringify(data));
