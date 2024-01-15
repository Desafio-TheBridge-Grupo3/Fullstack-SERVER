const Sequelize = require('sequelize');
const op = Sequelize.Op;
const Advisor = require("../models/advisor.model");

const getAdvisor = async (req, res) => {
  try {
    const username = req.query.username || '';
    const email = req.query.email || '';
    const advisor = await Advisor.findOne({
      attributes: {
        exclude: ["id", "password"],
      },
      where: {
        [op.or]: {
          username: username,
          email: email,
        },
      },
    });
    if (!advisor && username) {
      res
        .status(200)
        .json({
          success: false,
          message: `Advisor ${username} does not exist.`,
        });
    } else if (!advisor && email) {
      res
        .status(200)
        .json({
          success: false,
          message: `Advisor with email ${email} does not exist.`,
        });
    } else {
      res.status(200).json({ success: true, data: advisor });
    }
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const createAdvisor = async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    let advisor = await Advisor.findOne({
      attributes: {
        exclude: ["id", "password"],
      },
      where: { username: username },
    });
    if (advisor) {
      res
        .status(200)
        .json({ success: false, message: `Username already in use.` });
    } else {
      advisor = await Advisor.findOne({
        attributes: {
          exclude: ["id", "password"],
        },
        where: { email: email },
      });
      if (advisor) {
        res
          .status(200)
          .json({ success: false, message: `Email already registered.` });
      } else {
        advisor = await Advisor.create(req.body);
        res.status(201).json({ success: true, user: advisor });
      }
    }
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const updateAdvisor = async (req, res) => {
  try {

    let noUser = true;
    let noEmail = true;

    if (req.body.username) {
      let advisor = await Advisor.findOne({
        attributes: {
          exclude: ["id", "password"],
        },
        where: { username: req.body.username },
      });
      if (advisor) {noUser = false}
    }
    
    if (req.body.email) {
      let advisor = await Advisor.findOne({
        attributes: {
          exclude: ["id", "password"],
        },
        where: { email: req.body.email },
      });
      if (advisor) {noEmail = false}
    };
    console.log('----------------------------------------');
    console.log(noUser && noEmail);
    console.log('----------------------------------------');
    if (noUser && noEmail) {
      await Advisor.update(req.body, {
        where: {email: req.params.email},
        individualHooks: true,
      });
      res.status(200).json({success: true, message: `Advisor register updated successfully.`});
    } else {
      res.status(200).json({ success: false, message: `Email or username already registered.` });
    }

  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const deleteAdvisor = async (req, res) => {
  try {
    const username = req.query.username || '';
    const email = req.query.email || '';
    const advisor = await Advisor.findOne({
      attributes: {
        exclude: ["password"],
      },
      where: {
        [op.or]: {
          username: username,
          email: email,
        },
      },
    });
    if (!advisor && username) {
      res
        .status(200)
        .json({
          success: false,
          message: `Advisor ${username} does not exist.`,
        });
    } else if (!advisor && email) {
      res
        .status(200)
        .json({
          success: false,
          message: `Advisor with email ${email} does not exist.`,
        });
    } else {
      await advisor.destroy();
      res.status(200).json({success: true, message: `Advisor register deleted successfully.`});
    }
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const controllers = {
  getAdvisor,
  createAdvisor,
  updateAdvisor,
  deleteAdvisor,
};

module.exports = controllers;
