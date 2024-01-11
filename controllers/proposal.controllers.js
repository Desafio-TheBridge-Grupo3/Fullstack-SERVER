const Proposal = require("../models/proposal.model");
const CIA_Several = require("../models/ciaSeveral.model");
const Agreement = require("../models/agreement.model");
const Address = require("../models/address.model");
const Cliet_ERP = require("../models/clientERP.model");
const Advisor = require("../models/advisor.model");
const CIA_Client = require("../models/ciaClient.model");
const Price = require("../models/price.model");

const getProposal = async (req, res) => {
  try {
    let proposal = await Proposal.findOne({
      where: { id: req.body.id },
      attributes: {
        exclude: ["id"],
      },
      include: [
        {
          model: CIA_Several,
          required: true,
          attributes: {
            exclude: ["id"],
          },
        },
        {
          model: Agreement,
          required: true,
          attributes: {
            exclude: ["id"],
          },
        },
      ],
    });
    proposal = proposal.dataValues;
    delete proposal.id_cia_several;
    delete proposal.id_agreement;
    proposal.CIA_Several = proposal.CIA_Several.dataValues;
    proposal.Agreement = proposal.Agreement.dataValues;

    res.status(200).json({success: true, data: proposal});
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const createProposal = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const deleteProposal = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

// const controllers = {
//     getProposal,
//     createProposal,
//     deleteProposal,
// };

// module.exports = controllers;
