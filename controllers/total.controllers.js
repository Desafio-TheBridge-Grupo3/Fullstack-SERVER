const Total = require('../models/total.model');
const Consumption = require('../models/consumption.model');
const CIA_Client = require('../models/ciaClient.model');
const Price = require('../models/price.model');

const getTotal = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(400).json({ message: `ERROR: ${error.stack}` });
    }
};

const createTotal = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(400).json({ message: `ERROR: ${error.stack}` });
    }
};

const deleteTotal = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(400).json({ message: `ERROR: ${error.stack}` });
    }
};

const controllers = {
    getTotal,
    createTotal,
    deleteTotal,
}

module.exports = controllers;