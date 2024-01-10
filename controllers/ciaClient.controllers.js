const CIA_Client = require("../models/ciaClient.model");
const Price = require("../models/price.model");

CIA_Client.hasOne(Price, { foreignKey: "id" });

const getCIAClient = async (req, res) => {
  try {
    const client = await CIA_Client.findOne({
      where: { id: req.body.id },
      attributes: {
        exclude: ["id", "id_price"],
      },
      include: [
        {
          model: Price,
          required: true,
          attributes: {
            exclude: ["id"],
          },
        },
      ],
    });
    if (!client) {
      res
        .status(404)
        .json({ success: false, message: "CIA Client could not be found." });
    } else {
      client.dataValues.Price = client.dataValues.Price.dataValues;
      res.status(200).json({ success: true, data: client.dataValues });
    }
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const createCIAClient = async (req, res) => {
  try {
    const price = await Price.create(req.body.price);
    let data = req.body.client;
    data.id_price = price.dataValues.id;
    const client = await CIA_Client.create(data);
    client.price = price.dataValues;
    res.status(201).json({ success: true, data: client.dataValues });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const deleteCIAClient = async (req, res) => {
    try {
        const client = await CIA_Client.findOne({where: {id: req.body.id}});
        await Price.destroy({where: {id: client.dataValues.id_price}});
        await client.destroy();
        res.status(200).json({success: true, message: 'CIA Client deleted successfully.'});
    } catch (error) {
        res.status(400).json({ message: `ERROR: ${error.stack}` });
    }
};

const controllers = {
    getCIAClient,
    createCIAClient,
    deleteCIAClient
};

module.exports = controllers;
