const express = require('express');
const router = express.Router();
const controllers = require('../controllers/ciaConSeveral.controllers');

router.get('/all', controllers.getAllCiaConSeveral);
router.post('/', controllers.getCiaConSeveral);
router.post('/create', controllers.createCiaConSeveral);
router.put('/', controllers.updateCiaConSeveral);
router.delete('/', controllers.deleteCiaConSeveral);

module.exports = router;
