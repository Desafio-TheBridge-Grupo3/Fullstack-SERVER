const Advisor = require("../models/advisor.model");

// GET ADVISOR(S)
const getAdvisor = async (req, res) => {
    //console.log("---", req, "---")
    const advisorUser = req.query.user;
    if (advisorUser) {
        const query = await Advisor.findOne({
            where: { user: advisorUser}
        });
        res.status(200).json(query)
    } else {
        try {
            const query = await Advisor.findAll();
            res.status(200).json(query);
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: error.message })
        }
    }
}

// ADD ADVISOR
const createAdvisor = async (req, res) => {
    try {
      const query = await Advisor.create(req.body);
      res.status(201).json(query);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  };

  // UPDATE PLANT
const updateAdvisor = async (req, res) => {
    try {
      const update = await Advisor.update(req.body, {
        where: { user: req.query.user },
      });
      res.status(200).json(update);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  };

  // DELETE ADVISOR
const deleteAdvisor = async (req, res) => {
    try {
      const deleted = await Advisor.destroy({
        where: { user: req.query.user },
      });
      res.status(200).json(deleted);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  };

  const advisorController = {
    getAdvisor,
    createAdvisor,
    updateAdvisor,
    deleteAdvisor,
  };
  
  module.exports = advisorController;