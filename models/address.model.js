const { db } = require("../config/sql_connection");
const { DataTypes } = require("sequelize");

const Address = db.define(
  "Address",
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
        allowNull: false,
    },
    cp: {
        field: "cp",
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    province: {
        field: "province",
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    city: {
        field: "city",
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    address_type: {
        field: "address_type",
        type: DataTypes.STRING(1),
        allowNull: false,
    },
    zone: {
        field: "zone",
        type: DataTypes.STRING(1),
        allowNull: false,
    },
  },
  {
    db,
    modelName: "Address",
    tableName: "Address",
    timestamps: false,
  }
);

Address.sync();

module.exports = Address;
