const Address = require("../models/address.model");

// GET ADVISOR(S)
const getAddress = async (req, res) => {
    //console.log("---", req, "---")
    const addressId = req.query.id;
    if (addressId) {
        const query = await Address.findOne({
            where: { id: addressId }
        });
        res.status(200).json(query)
    } else {
        try {
            const query = await Address.findAll();
            res.status(200).json(query);
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: error.message })
        }
    }
}

// ADD ADVISOR
const createAddress = async (req, res) => {
    try {
      const query = await Address.create(req.body);
      res.status(201).json(query);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  };

  // UPDATE PLANT
const updateAddress = async (req, res) => {
    try {
      const update = await Address.update(req.body, {
        where: { id: req.query.id },
      });
      res.status(200).json(update);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  };

  // DELETE ADVISOR
const deleteAddress = async (req, res) => {
    try {
      const deleted = await Address.destroy({
        where: { id: req.query.id },
      });
      res.status(200).json(deleted);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  };

  const plantsController = {
    getAddress,
    createAddress,
    updateAddress,
    deleteAddress,
  };
  
  module.exports = plantsController;