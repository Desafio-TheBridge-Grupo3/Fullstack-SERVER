const { db } = require("../config/sql_connection");
const { DataTypes } = require("sequelize");

const Type = db.define(
  "Type",
  {
    id: {
      field: "id",
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    concept: {
        field: "concept",
        type: DataTypes.TEXT,
        allowNull: false,
    },
    proposal_code: {
        field: "proposal_code",
        type: DataTypes.TEXT,
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
        allowNull: true,
    },
    con_price_P5: {
        field: "con_price_P5",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    con_price_P6: {
        field: "con_price_P6",
        type: DataTypes.FLOAT,
        allowNull: true,
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
        allowNull: true,
    },
    pow_price_P5: {
        field: "pow_price_P5",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    pow_price_P6: {
        field: "pow_price_P6",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    savings: {
        field: "savings",
        type: DataTypes.TEXT,
        allowNull: false,
    },
    id_proposal: {
        field: "id_proposal",
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    db,
    modelName: "Type",
    tableName: "Type",
    timestamps: false,
  }
);

Type.sync();

module.exports = Type;
