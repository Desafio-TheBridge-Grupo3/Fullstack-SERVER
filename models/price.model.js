const { db } = require("../config/sqlConnection");
const { DataTypes } = require("sequelize");

const Price = db.define(
  "price",
  {
    id: {
      field: "id",
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    con_P1: {
        field: "con_p1",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    con_P2: {
        field: "con_p2",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    con_P3: {
        field: "con_p3",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    con_P4: {
        field: "con_p4",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    con_P5: {
        field: "con_p5",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    con_P6: {
        field: "con_p6",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    pow_P1: {
        field: "pow_p1",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    pow_P2: {
        field: "pow_p2",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    pow_P3: {
        field: "pow_p3",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    pow_P4: {
        field: "pow_p4",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    pow_P5: {
        field: "pow_p5",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    pow_P6: {
        field: "pow_p6",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
  },
  {
    db,
    modelName: "Price",
    tableName: "price",
    timestamps: false,
  }
);

Price.sync();

module.exports = Price;