const CIA_con_several = require("../models/ciaConSeveral.model");

const getCiaConSeveral = async (req, res) => {
  try {
    const cia = await CIA_con_several.findOne({
      where: { 
        cia: req.body.cia,
        zone: req.body.zone,
        rate: req.body.rate,
        indexed_date: req.body.indexed_date,
        fee: req.body.fee,
        product_cia: req.body.product_cia,
        market: req.body.market,
       },
      attributes: {
        exclude: ["id"],
      },
    });
    if (!cia) {
      res.status(404).json({
        success: false,
        message: `CIA con Several register could not be found`,
      });
    } else {
      res.status(200).json({ success: true, data: cia.dataValues });
    };
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const getAllCiaConSeveral = async (req, res) => {
  try {
    let cia = await CIA_con_several.findAll({
      limit: req.query.limit,
      attributes: {
        exclude: ["id"]
      }
    });
    cia = cia.map(c => c.dataValues);
    res.status(200).json({ success: true, count: cia.length, data: cia});
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const createCiaConSeveral = async (req, res) => {
  try {
    const cia = await CIA_con_several.create(req.body);
    res.status(201).json({ success: true, data: cia.dataValues });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const updateCiaConSeveral = async (req, res) => {
  try {
    await CIA_con_several.update(
        {
            cia: req.body.cia,
            zone: req.body.zone,
            rate: req.body.rate,
            indexed_date: req.body.indexed_date,
            fee: req.body.fee,
            product_cia: req.body.product_cia,
            market: req.body.market,
            con_price_P1: req.body.con_price_P1,
            con_price_P2: req.body.con_price_P2,
            con_price_P3: req.body.con_price_P3,
            con_price_P4: req.body.con_price_P4,
            con_price_P5: req.body.con_price_P5,
            con_price_P6: req.body.con_price_P6,
        },
        { where: { id: req.body.id } }
    );
    res.status(200).json({ success: true, message: 'CIA con Several register updated successfully.' });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const deleteCiaConSeveral = async (req, res) => {
  try {
    await CIA_con_several.destroy({ where: { id: req.body.id } });
    res.status(200).json({
      success: true,
      message: "CIA con Several register deleted successfully.",
    });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const controllers = {
    getCiaConSeveral,
    getAllCiaConSeveral,
    createCiaConSeveral,
    updateCiaConSeveral,
    deleteCiaConSeveral,
};

module.exports = controllers;
