const topicService = require('../services/topicService');

exports.getTopics = async (req, res, next) => {
  try {
    const topics = await topicService.findAll();

    topics.sort((a, b) => {
      if (a.topic.toUpperCase() > b.topic.toUpperCase()) {
        return 1;
      } else if (a.topic.toUpperCase() < b.topic.toUpperCase()) {
        return -1;
      }
      return 0;
    });

    res.status(200).json({ topics });
  } catch (err) {
    next(err);
  }
};

exports.getTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const topic = await topicService.findById(id);

    res.status(200).json({ topic });
  } catch (err) {
    next(err);
  }
};

exports.createTopic = async (req, res, next) => {
  try {
    const { topic } = req.body;

    if (!topic || typeof topic !== 'string' || !topic.trim())
      return res.status(400).json({ message: 'topic is required and must be a string' });

    const Topic = await topicService.save({ topic });
    res.status(201).json({ Topic });
  } catch (err) {
    next(err);
  }
};

exports.updateTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { topic } = req.body;

    if (!id) return res.status(400).json({ message: 'id is required' });
    if (!topic || typeof topic !== 'string' || !topic.trim())
      return res.status(400).json({ message: 'topic is required and must be a string' });

    const updatedTopic = await topicService.updateById(id, { topic });
    if (!updatedTopic) return res.status(404).json({ message: 'topic with this id is not found' });

    res.status(200).json({ updatedTopic });
  } catch (err) {
    next(err);
  }
};

exports.deleteTopic = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'id is required' });

    const deletedTopic = await topicService.deleteById(id);
    if (!deletedTopic) return res.status(404).json({ message: 'topic with this id is not found' });

    res.status(200).json({ deletedTopic });
  } catch (err) {
    next(err);
  }
};
