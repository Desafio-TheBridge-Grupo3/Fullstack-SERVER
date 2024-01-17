const express = require('express');
const router = express.Router();
const controllers = require('../controllers/ciaPowSeveral.controllers');

router.get('/all', controllers.getAllCiaPowSeveral);
router.post('/', controllers.getCiaPowSeveral);
router.post('/create', controllers.createCiaPowSeveral);
router.put('/', controllers.updateCiaPowSeveral);
router.delete('/', controllers.deleteCiaPowSeveral);

module.exports = router;
