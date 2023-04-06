const categoryService = require('../services/categoryService');

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.findAll();

    categories.sort((a, b) => {
      if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return 1;
      } else if (a.name.toUpperCase() < b.name.toUpperCase()) {
        return -1;
      }
      return 0;
    });

    res.status(200).json({ categories });
  } catch (err) {
    next(err);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name, type } = req.body;

    if (!name || typeof name !== 'string' || !name.trim())
      return res.status(400).json({ message: 'name is required and must be a string' });

    if (!type || typeof type !== 'string')
      return res.status(400).json({ message: 'type is required and must be a string' });
    if (type.toLowerCase() !== 'income' && type.toLowerCase() !== 'expense')
      return res.status(400).json({ message: 'type must be INCOME or EXPENSE' });

    const category = await categoryService.save({ name, type: type.toUpperCase() });
    res.status(201).json({ category });
  } catch (err) {
    next(err);
  }
};
