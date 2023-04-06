const personService = require('../services/personService');

exports.getPersons = async (req, res, next) => {
  try {
    const persons = await personService.findAll();

    persons.sort((a, b) => {
      if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return 1;
      } else if (a.name.toUpperCase() < b.name.toUpperCase()) {
        return -1;
      }
      return 0;
    });

    res.status(200).json({ persons });
  } catch (err) {
    next(err);
  }
};

exports.createPerson = async (req, res, next) => {
  try {
    const { name} = req.body;

    if (!name || typeof name !== 'string' || !name.trim())
      return res.status(400).json({ message: 'name is required and must be a string' });

    const person = await personService.save({ name });
    res.status(201).json({ person });
  } catch (err) {
    next(err);
  }
};
