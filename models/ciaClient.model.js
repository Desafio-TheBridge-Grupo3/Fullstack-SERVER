const { db } = require("../config/sql_connection");
const { DataTypes } = require("sequelize");

const CIA_Client = db.define(
  "CIA_Client",
  {
    id: {
      field: "id",
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
        field: "name",
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    issue_date: {
        field: "issue_date",
        type: DataTypes.DATE,
        allowNull: false,
    },
    start_date: {
        field: "start_date",
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        field: "end_date",
        type: DataTypes.DATE,
        allowNull: false,
    },
    billing_days: {
        field: "billing_days",
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    discount_energy: {
        field: "discount_energy",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    discount_power: {
        field: "discount_power",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    iva: {
        field: "iva",
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    consumme_sips: {
        field: "consumme_sips",
        type: DataTypes.TEXT,
        allowNull: false,
    },
    tax: {
        field: "tax",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    other_taxes: {
        field: "other_taxes",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    maintenance: {
        field: "maintenance",
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    id_total: {
        field: "id_total",
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_price: {
        field: "id_price",
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_consumption: {
        field: "id_consumption",
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    db,
    modelName: "CIA_Client",
    tableName: "CIA_Client",
    timestamps: false,
  }
);

CIA_Client.sync();

module.exports = CIA_Client;
