const personService = require('../services/personService');
const topicService = require('../services/topicService');
const requestService = require('../services/requestService');
const { createPersonMapping,createTopicMapping  } = require('../utils/mapping');

exports.getRequests = async (req, res, next) => {
  try {
    const result = await requestService.findAll();
    const personMapping = await createPersonMapping();
    const topicMapping = await createTopicMapping();

    
    const requests = result
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ personId, topicId, ...rest }) => ({
      ...rest,
      person: personMapping[personId],
      topic: topicMapping[topicId]
    }));


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

      const topic = await topicService.findById(request.topicId);
      request.topic = topic;
      delete request.topicId;
    }

    res.status(200).json({ request });
  } catch (err) {
    next(err);
  }
};

exports.createRequest = async (req, res, next) => {
  try {
    const { topicId, date, personId } = req.body;

    if (!topicId) return res.status(400).json({ message: 'topic id is required' });

    if (!personId) return res.status(400).json({ message: 'person id is required' });

    if (!date || isNaN(new Date(date)))
      return res.status(400).json({ message: 'date is required and must be a valid date format' });

    const person = await personService.findById(personId);
    if (!person) return res.status(400).json({ message: 'person with this id is not found' });

    const topic = await topicService.findById(topicId);
    if (!topic) return res.status(400).json({ message: 'topic with this id is not found' });

    const request = await requestService.save({ topicId, date: new Date(date), personId });
    request.person = person;
    request.topic = topic;
    delete request.personId;
    delete request.topicId;

    res.status(201).json({ request });
  } catch (err) {
    next(err);
  }
};

exports.updateRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { topicId, date, personId } = req.body;

    if (!topicId) return res.status(400).json({ message: 'topic id is required' });

    if (!personId) return res.status(400).json({ message: 'person id is required' });

    if (!date || isNaN(new Date(date)))
      return res.status(400).json({ message: 'date is required and must be a valid date format' });

    const person = await personService.findById(personId);
    if (!person) return res.status(400).json({ message: 'person with this id is not found' });
    const topic = await topicService.findById(topicId);
    if (!topic) return res.status(400).json({ message: 'topic with this id is not found' });

    const request = await requestService.updateById(id, {
      topicId,
      date: new Date(date),
      personId
    });
    if (!request) return res.status(400).json({ message: 'request with this id is not found' });
    request.person = person;
    delete request.personId;
    request.topic = topic;
    delete request.topicId;
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
