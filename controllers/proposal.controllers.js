const Proposal = require("../models/proposal.model");
const Agreement = require("../models/agreement.model");
const Address = require("../models/address.model");
const Advisor = require("../models/advisor.model");
const CIA_Client = require("../models/ciaClient.model");
const Client_ERP = require("../models/clientERP.model");
const Price = require("../models/price.model");

const getProposal = async (req, res) => {
  try {
    // Query in db of Proposal
    let proposal = await Proposal.findOne({
      where: { id: req.params.id },
      attributes: {
        exclude: ["id", "id_agreement"],
      },
      include: [
        {
          model: Agreement,
          as: "agreement",
          required: true,
          attributes: {
            exclude: ["id"],
          },
        },
      ],
    });
    if (!proposal) {
      res.status(404).json({
        success: false,
        message: `Proposal with id ${req.params.id} does not exist.`,
      });
    } else {
      // Proposal object cleaning
      proposal = proposal.dataValues;
      proposal.date = new Date(proposal.date).toLocaleString();
      proposal.agreement = proposal.agreement.dataValues;

      // Query in db of Agreement's Address
      const address = await Address.findOne({
        where: { id: proposal.agreement.id_address },
        attributes: {
          exclude: ["id"],
        },
      });
      proposal.agreement.address = address.dataValues;
      delete proposal.agreement.id_address;

      // Query in db of Client ERP
      let client_erp = await Client_ERP.findOne({
        where: { id: proposal.agreement.id_client_erp },
        attributes: {
          exclude: ["id", "id_address", "id_advisor"],
        },
        include: [
          {
            model: Address,
            as: "address",
            required: true,
            attributes: {
              exclude: ["id"],
            },
          },
          {
            model: Advisor,
            as: "advisor",
            required: true,
            attributes: {
              exclude: ["id", "password", "role"],
            },
          },
        ],
      });

      if (!client_erp) {
        // Set Client ERP as null and remove id
        proposal.client_erp = null;
        delete proposal.agreement.id_client_erp;
      } else {
        // Client ERP object cleaning
        client_erp = client_erp.dataValues;
        client_erp.date_last_modify = new Date(
          client_erp.date_last_modify
        ).toLocaleString();
        client_erp.address = client_erp.address.dataValues;
        client_erp.advisor = client_erp.advisor.dataValues;
        proposal.client_erp = client_erp; // Adds Client ERP as a key inside Proposal
        delete proposal.agreement.id_client_erp;
      }

      // Query in db of CIA Client
      let cia_client = await CIA_Client.findOne({
        where: { id: proposal.agreement.id_cia_client },
        attributes: {
          exclude: ["id", "id_price"],
        },
        include: [
          {
            model: Price,
            as: "price",
            required: true,
            attributes: {
              exclude: ["id"],
            },
          },
        ],
      });

      if (!cia_client) {
        // Set CIA client as null and remove id
        proposal.cia_client = null;
        delete proposal.agreement.id_cia_client;
      } else {
        // CIA Client object cleaning
        cia_client = cia_client.dataValues;
        cia_client.issue_date = new Date(
          cia_client.issue_date
        ).toLocaleString();
        cia_client.start_date = new Date(
          cia_client.start_date
        ).toLocaleString();
        cia_client.end_date = new Date(cia_client.end_date).toLocaleString();
        cia_client.price = cia_client.price.dataValues;
        proposal.cia_client = cia_client; // Adds CIA Client as a key inside Proposal
        delete proposal.agreement.id_cia_client;
      }

      // Response with data
      res.status(200).json({ success: true, data: proposal });
    }
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const getAllProposals = async (req, res) => {
  try {
    // Query in db of Proposal
    let proposal = await Proposal.findAll({
      limit: req.query.limit,
      attributes: {
        exclude: ["id_agreement"],
      },
      include: [
        {
          model: Agreement,
          as: "agreement",
          required: false,
          attributes: {
            exclude: ["id"],
          },
        },
      ],
    });
    if (!proposal) {
      res.status(404).json({
        success: false,
        message: `Could not find proposals.`,
      });
    } else {
      // Proposal object cleaning
      proposal = proposal.map((p) => {
        let obj = p.dataValues;
        obj.date = new Date(p.date).toLocaleString();
        obj.agreement = p.agreement.dataValues;
        return obj;
      });

      // Agreement's Address
      let address = await Address.findAll();
      address = address.map((a) => a.dataValues);
      for (p of proposal) {
        let addressRef = address.find((a) => a.id === p.agreement.id_address);
        p.agreement.address = addressRef;
        delete p.agreement.id_address;
        delete p.agreement.address.id;
      }

      // Query in db of Client ERP
      let client_erp = await Client_ERP.findAll({
        attributes: {
          exclude: ["id_address", "id_advisor"],
        },
        include: [
          {
            model: Address,
            as: "address",
            required: false,
            attributes: {
              exclude: ["id"],
            },
          },
          {
            model: Advisor,
            as: "advisor",
            required: false,
            attributes: {
              exclude: ["id", "password", "role"],
            },
          },
        ],
      });

      if (!client_erp) {
        // Set Client ERP as null and remove id
        proposal = proposal.map((p) => {
          p.client_erp = null;
          delete p.agreement.id_client_erp;
          return p;
        });
      } else {
        // Client ERP object cleaning
        client_erp = client_erp.map((c) => {
          let obj = c.dataValues;
          obj.date_last_modify = new Date(
            c.date_last_modify
          ).toLocaleString();
          obj.address = obj.address.dataValues;
          obj.advisor = obj.advisor.dataValues;
          return obj;
        });
        for (let p of proposal) {
          let clientRef = client_erp.find(
            (c) => c.id === p.agreement.id_client_erp
          );
          p.client_erp = clientRef; // Adds Client ERP as a key inside Proposal
          delete p.agreement.id_client_erp;
          delete p.client_erp.id;
        }
      }

      // Query in db of CIA Client
      let cia_client = await CIA_Client.findAll({
        attributes: {
          exclude: ["id_price"],
        },
        include: [
          {
            model: Price,
            as: "price",
            required: true,
            attributes: {
              exclude: ["id"],
            },
          },
        ],
      });

      if (!cia_client) {
        // Set CIA client as null and remove id
        proposal = proposal.map((p) => {
          p.cia_client = null;
          delete p.Agreement.id_cia_client;
          return p;
        });
      } else {
        // CIA Client object cleaning
        cia_client = cia_client.map((c) => {
          let obj = c.dataValues;
          obj.issue_date = new Date(c.issue_date).toLocaleString();
          obj.start_date = new Date(c.start_date).toLocaleString();
          obj.end_date = new Date(c.end_date).toLocaleString();
          obj.price = obj.price.dataValues;
          return obj;
        });
        for (let p of proposal) {
          let clientRef = cia_client.find(
            (c) => c.id === p.agreement.id_cia_client
          );
          p.cia_client = clientRef; // Adds CIA Client as a key inside Proposal
          delete p.agreement.id_cia_client;
          delete p.cia_client.id;
        }
      }

      // Response with data
      res.status(200).json({ success: true, count: proposal.length, data: proposal });
    }
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const createProposal = async (req, res) => {
  try {
    // Setup data from body
    let cia_client = req.body.cia_client;
    let client_erp = req.body.client_erp;
    let agreement = req.body.agreement;
    let proposal = req.body.proposal;

    // Search for Advisor
    const advisor = await Advisor.findOne({
      where: { email: req.body.advisor.email },
      attributes: {
        exclude: ["password"],
      },
    });

    // Price and CIA Client creation
    let price = await Price.create(req.body.price);
    cia_client.id_price = price.dataValues.id;
    let cia_client_ref = await CIA_Client.create(cia_client);

    // Address and Client_ERP creation
    let erpAddress = await Address.create(req.body.erpAddress);
    client_erp.id_address = erpAddress.dataValues.id;
    client_erp.id_advisor = advisor.dataValues.id;
    let client_erp_ref = await Client_ERP.create(client_erp);

    // Agreement and Proposal creation
    let agreementAddress = await Address.create(req.body.agreementAddress);
    agreement.id_address = agreementAddress.dataValues.id;
    agreement.id_client_erp = client_erp_ref.dataValues.id;
    agreement.id_cia_client = cia_client_ref.dataValues.id;
    let agreement_ref = await Agreement.create(agreement);
    proposal.id_agreement = agreement_ref.dataValues.id;
    let proposal_ref = await Proposal.create(proposal);

    // Response data
    cia_client_ref = cia_client_ref.dataValues;
    cia_client_ref.issue_date = new Date(cia_client_ref.issue_date).toLocaleString();
    cia_client_ref.start_date = new Date(cia_client_ref.start_date).toLocaleString();
    cia_client_ref.end_date = new Date(cia_client_ref.end_date).toLocaleString();
    cia_client_ref.price = price.dataValues;
    delete cia_client_ref.price.id;
    delete cia_client_ref.id_price;
    delete cia_client_ref.id;

    client_erp_ref = client_erp_ref.dataValues;
    client_erp_ref.date_last_modify = new Date(client_erp_ref.date_last_modify).toLocaleString();
    client_erp_ref.address = erpAddress.dataValues;
    client_erp_ref.advisor = advisor.dataValues;
    delete client_erp_ref.address.id;
    delete client_erp_ref.advisor.id;
    delete client_erp_ref.id_address;
    delete client_erp_ref.id_advisor;
    delete client_erp_ref.id;

    agreement_ref = agreement_ref.dataValues;
    agreement_ref.address = agreementAddress.dataValues;
    delete agreement_ref.address.id;
    delete agreement_ref.id_address;
    delete agreement_ref.id_client_erp;
    delete agreement_ref.id_cia_client;
    delete agreement_ref.id;

    proposal_ref = proposal_ref.dataValues;
    delete proposal_ref.id_agreement;
    delete proposal_ref.id;

    const data = proposal_ref;
    data.agreement = agreement_ref;
    data.client_erp = client_erp_ref;
    data.cia_client = cia_client_ref;

    res.status(201).json({ success: true, data: data });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const deleteProposal = async (id) => {
  try {
    const proposal = await Proposal.findOne({ where: { id: id } });
    if (!proposal) {
      res.status(404).json({
        success: false,
        message: `Proposal register with id ${req.body.id} does not exist.`,
      });
    } else {
      // Get all dependecies ref
      const agreement = await Agreement.findOne({
        where: { id: proposal.dataValues.id_agreement },
      });
      const agreementAddress = await Address.findOne({
        where: { id: agreement.dataValues.id_address },
      });
      const cia_client = await CIA_Client.findOne({
        where: { id: agreement.dataValues.id_cia_client },
      });
      const price = await Price.findOne({
        where: { id: cia_client.dataValues.id_price },
      });
      const client_erp = await Client_ERP.findOne({
        where: { id: agreement.dataValues.id_client_erp },
      });
      const erpAddress = await Address.findOne({
        where: { id: client_erp.dataValues.id_address },
      });

      // Delete all register in order of dependencies from database
      await erpAddress.destroy();
      await client_erp.destroy();
      await price.destroy();
      await cia_client.destroy();
      await agreementAddress.destroy();
      await agreement.destroy();
      await proposal.destroy();

      res.status(200).json({
        success: true,
        message: "Proposal register deleted successfully.",
      });
    }
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const controllers = {
    getProposal,
    getAllProposals,
    createProposal,
    deleteProposal,
};

module.exports = controllers;
