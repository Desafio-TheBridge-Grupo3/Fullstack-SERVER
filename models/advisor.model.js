const { db } = require("../config/sql_connection");
const { DataTypes } = require("sequelize");

const Advisor = db.define(
  "Advisor",
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
        type: DataTypes.TEXT,
        allowNull: true,
    },
    user: {
        field: "user",
        type: DataTypes.TEXT,
        allowNull: true,
    },
    email: {
        field: "email",
        type: DataTypes.TEXT,
        allowNull: false,
    },
    password: {
        field: "password",
        type: DataTypes.TEXT,
        allowNull: true,
    },
    role: {
        field: "role",
        type: DataTypes.STRING,
        allowNull: true,
    },
  },
  {
    db,
    modelName: "Advisor",
    tableName: "Advisor",
    timestamps: false,
  }
);

Advisor.sync();

module.exports = Advisor;
