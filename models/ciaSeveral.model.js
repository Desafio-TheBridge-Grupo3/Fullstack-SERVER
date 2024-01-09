const { type } = require("os");
const { db } = require("../config/sql_connection");
const { DataTypes } = require("sequelize");

const CIA_Several = db.define(
  "CIA_Several",
  {
    id: {
      field: "id",
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    cia: {
      field: "cia",
      type: DataTypes.TEXT,
      allowNull: false,
    },
    zone: {
      field: "zone",
      type: DataTypes.STRING(1),
      allowNull: false,
    },
    rate: {
      field: "rate",
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    indexed_date: {
        field: "indexed_date",
        type: DataTypes.DATE,
        allowNull: false,
    },
    fee: {
        field: "fee",
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    market: {
        field: "market",
        type: DataTypes.TEXT,
        allowNull: false,
    },
    product_name: {
      field: "product_name",
      type: DataTypes.STRING,
      allowNull: false,
    },
    con_price_P1: {
      field: "con_price_P1",
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    con_price_P2: {
      field: "con_price_P2",
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    con_price_P3: {
      field: "con_price_P3",
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    con_price_P4: {
      field: "con_price_P4",
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    con_price_P5: {
      field: "con_price_P5",
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    con_price_P6: {
      field: "con_price_P6",
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    pow_price_P1: {
      field: "pow_price_P1",
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    pow_price_P2: {
      field: "pow_price_P2",
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    pow_price_P3: {
      field: "pow_price_P3",
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    pow_price_P4: {
      field: "pow_price_P4",
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    pow_price_P5: {
      field: "pow_price_P5",
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    pow_price_P6: {
      field: "pow_price_P6",
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    db,
    modelName: "CIA_Several",
    tableName: "CIA_Several",
    timestamps: false,
  }
);

CIA_Several.sync();

module.exports = CIA_Several;
