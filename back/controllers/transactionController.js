const categoryService = require('../services/categoryService');
const transactionService = require('../services/transactionService');
const { createCategoryMapping } = require('../utils/mapping');

exports.getTransactions = async (req, res, next) => {
  try {
    const result = await transactionService.findAll();
    const categoryMapping = await createCategoryMapping();

    const transactions = result
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .map(({ categoryId, ...rest }) => ({ ...rest, category: categoryMapping[categoryId] }));

    res.status(200).json({ transactions });
  } catch (err) {
    next(err);
  }
};

exports.getTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await transactionService.findById(id);

    if (transaction) {
      const category = await categoryService.findById(transaction.categoryId);
      transaction.category = category;
      delete transaction.categoryId;
    }

    res.status(200).json({ transaction });
  } catch (err) {
    next(err);
  }
};

exports.createTransaction = async (req, res, next) => {
  try {
    const { payee, categoryId, amount, date, comment } = req.body;

    if (!payee || typeof payee !== 'string' || !payee.trim())
      return res.status(400).json({ message: 'payee is required and must be a string' });

    if (!categoryId) return res.status(400).json({ message: 'category id is required' });

    if (typeof amount !== 'number' || isNaN(amount) || amount <= 0)
      return res.status(400).json({ message: 'amount is required, must be a number and greater than zero' });

    if (!date || isNaN(new Date(date)))
      return res.status(400).json({ message: 'date is required and must be a valid date format' });

    const category = await categoryService.findById(categoryId);
    if (!category) return res.status(400).json({ message: 'category with this id is not found' });

    const transaction = await transactionService.save({ payee, amount, date: new Date(date), comment, categoryId });
    transaction.category = category;
    delete transaction.categoryId;

    res.status(201).json({ transaction });
  } catch (err) {
    next(err);
  }
};

exports.updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { payee, categoryId, amount, date, comment } = req.body;

    if (!payee || typeof payee !== 'string' || !payee.trim())
      return res.status(400).json({ message: 'payee is required and must be a string' });

    if (!categoryId) return res.status(400).json({ message: 'category id is required' });

    if (typeof amount !== 'number' || isNaN(amount) || amount <= 0)
      return res.status(400).json({ message: 'amount is required, must be a number and greater than zero' });

    if (!date || isNaN(new Date(date)))
      return res.status(400).json({ message: 'date is required and must be a valid date format' });

    const category = await categoryService.findById(categoryId);
    if (!category) return res.status(400).json({ message: 'category with this id is not found' });

    const transaction = await transactionService.updateById(id, {
      payee,
      amount,
      date: new Date(date),
      comment,
      categoryId
    });
    if (!transaction) return res.status(400).json({ message: 'transaction with this id is not found' });
    transaction.category = category;
    delete transaction.categoryId;
    res.status(200).json({ transaction });
  } catch (err) {
    next(err);
  }
};

exports.deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await transactionService.deleteById(id);
    if (!result) return res.status(400).json({ message: 'transaction with this id is not found' });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
