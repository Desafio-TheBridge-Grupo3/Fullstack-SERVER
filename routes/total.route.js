const express = require('express');
const totalRouter = express.Router();
const totalController = require('../controllers/total.controllers');

totalRouter.get('/', totalController.getTotal)
totalRouter.post('/', totalController.createTotal)
totalRouter.delete('/', totalController.deleteTotal)


module.exports = totalRouter;