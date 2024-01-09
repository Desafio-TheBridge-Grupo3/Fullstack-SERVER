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
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    user: {
        field: "user",
        type: DataTypes.TEXT,
        allowNull: false,
    },
    email: {
        field: "email",
        type: DataTypes.TEXT,
        allowNull: false,
    },
    password: {
        field: "password",
        type: DataTypes.TEXT,
        allowNull: false,
    },
    role: {
        field: "role",
        type: DataTypes.STRING,
        allowNull: false,
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
