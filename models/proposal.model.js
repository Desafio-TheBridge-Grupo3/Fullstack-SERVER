const { db } = require("../config/sql_connection");
const { DataTypes } = require("sequelize");

const Proposal = db.define(
  "Proposal",
  {
    id: {
      field: "id",
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    type: {
        field: "type",
        type: DataTypes.STRING(1),
        allowNull: false,
    },
    concept: {
        field: "concept",
        type: DataTypes.TEXT,
        allowNull: false,
    },
    date: {
        field: "date",
        type: DataTypes.DATE,
        allowNull: false,
    },
    id_agreement: {
        field: "id_agreement",
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    db,
    modelName: "Proposal",
    tableName: "Proposal",
    timestamps: false,
  }
);

Proposal.sync();

module.exports = Proposal;
