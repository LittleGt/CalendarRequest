const personService = require('../services/personService');
const requestService = require('../services/requestService');
const { createPersonMapping } = require('../utils/mapping');

exports.getRequests = async (req, res, next) => {
  try {
    const result = await requestService.findAll();
    const personMapping = await createPersonMapping();

    
    const requests = result
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .map(({ personId, ...rest }) => ({ ...rest, person: personMapping[personId] }));


    // console.log(requests)
    res.status(200).json({ requests });
  } catch (err) {
    next(err);
  }
};

exports.getRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const request = await requestService.findById(id);

    if (request) {
      const person = await personService.findById(request.personId);
      request.person = person;
      delete request.personId;
    }

    res.status(200).json({ request });
  } catch (err) {
    next(err);
  }
};

exports.createRequest = async (req, res, next) => {
  try {
    const { topic, date, personId } = req.body;

    if (!topic || typeof topic !== 'string' || !topic.trim())
      return res.status(400).json({ message: 'topic is required and must be a string' });

    if (!personId) return res.status(400).json({ message: 'person id is required' });

    if (!date || isNaN(new Date(date)))
      return res.status(400).json({ message: 'date is required and must be a valid date format' });

    const person = await personService.findById(personId);
    if (!person) return res.status(400).json({ message: 'person with this id is not found' });

    const request = await requestService.save({ topic, date: new Date(date), personId });
    request.person = person;
    delete request.personId;

    res.status(201).json({ request });
  } catch (err) {
    next(err);
  }
};

exports.updateRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { topic, date, personId } = req.body;

    if (!topic || typeof topic !== 'string' || !topic.trim())
      return res.status(400).json({ message: 'topic is required and must be a string' });

    if (!personId) return res.status(400).json({ message: 'person id is required' });

    if (!date || isNaN(new Date(date)))
      return res.status(400).json({ message: 'date is required and must be a valid date format' });

    const person = await personService.findById(personId);
    if (!person) return res.status(400).json({ message: 'person with this id is not found' });

    const request = await requestService.updateById(id, {
      topic,
      date: new Date(date),
      personId
    });
    if (!request) return res.status(400).json({ message: 'request with this id is not found' });
    request.person = person;
    delete request.personId;
    res.status(200).json({ request });
  } catch (err) {
    next(err);
  }
};

exports.deleteRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await requestService.deleteById(id);
    if (!result) return res.status(400).json({ message: 'request with this id is not found' });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
