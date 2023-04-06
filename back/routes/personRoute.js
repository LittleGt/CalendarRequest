const router = require('express').Router();

const personController = require('../controllers/personController');

router.get('/', personController.getPersons);
router.post('/', personController.createPerson);

module.exports = router;
