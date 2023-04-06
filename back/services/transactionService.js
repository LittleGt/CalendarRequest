const { v4: uuidv4 } = require('uuid');
const { getTransaction, saveTransaction } = require('../utils/file');

exports.findAll = () => getTransaction();

exports.findById = async id => {
  const transactions = await getTransaction();
  return transactions.find(el => el.id === id) ?? null;
};

exports.save = async data => {
  const transactions = await getTransaction();
  const transaction = { id: uuidv4(), ...data };
  transactions.push(transaction);
  await saveTransaction(transactions);
  return transaction;
};

exports.updateById = async (id, data) => {
  const transactions = await getTransaction();
  const idx = transactions.findIndex(el => el.id === id);
  if (idx !== -1) {
    transactions[idx] = { id, ...data };
    await saveTransaction(transactions);
    return transactions[idx];
  }
  return null;
};

exports.deleteById = async id => {
  const transactions = await getTransaction();
  const idx = transactions.findIndex(el => el.id === id);
  if (idx !== -1) {
    transactions.splice(idx, 1);
    await saveTransaction(transactions);
    return true;
  }
  return false;
};
