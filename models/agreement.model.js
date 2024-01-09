const { db } = require("../config/sql_connection");
const { DataTypes } = require("sequelize");

const Agreement = db.define(
  "Agreement",
  {
    id: {
      field: "id",
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    cups20: {
        field: "cups20",
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    consumption: {
        field: "consumption",
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    cnae: {
        field: "cnae",
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    electric_meter: {
        field: "electric_meter",
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    vtension_code: {
        field: "vtension_code",
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_address: {
        field: "id_address",
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_client_erp: {
        field: "id_client_erp",
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_cia_several: {
        field: "id_cia_several",
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_cia_client: {
        field: "id_cia_client",
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cau: {
        field: "cau",
        type: DataTypes.STRING(30),
        allowNull: false,
    },
  },
  {
    db,
    modelName: "Agreement",
    tableName: "Agreement",
    timestamps: false,
  }
);

Agreement.sync();

module.exports = Agreement;
