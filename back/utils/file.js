const { readFile, writeFile } = require('fs/promises');

exports.getCategory = async () => {
  const data = await readFile('dbs/category.json');
  return JSON.parse(data);
};

exports.saveCategory = data => writeFile('dbs/category.json', JSON.stringify(data));

exports.getTransaction = async () => {
  const data = await readFile('dbs/transaction.json');
  return JSON.parse(data);
};

exports.saveTransaction = data => writeFile('dbs/transaction.json', JSON.stringify(data));
