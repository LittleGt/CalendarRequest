const router = require('express').Router();

const topicController = require('../controllers/topicController');

router.get('/', topicController.getTopics);
router.get('/:id', topicController.getTopic);
router.post('/', topicController.createTopic);
router.put('/:id', topicController.updateTopic);
router.delete('/:id', topicController.deleteTopic);

module.exports = router;
