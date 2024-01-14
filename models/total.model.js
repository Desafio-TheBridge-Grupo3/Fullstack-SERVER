const { db } = require("../config/sqlConnection");
const { DataTypes } = require("sequelize");

const Total_consumption = db.define(
  "total_consumption",
  {
    id: {
      field: "id",
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    type_code: {
        field: "type_code",
        type: DataTypes.STRING(2),
        allowNull: false,
    },
    result_con_p1: {
        field: "result_con_p1",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    result_con_p2: {
        field: "result_con_p2",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    result_con_p3: {
        field: "result_con_p3",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    result_con_p4: {
        field: "result_con_p4",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    result_con_p5: {
        field: "result_con_p5",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    result_con_p6: {
        field: "result_con_p6",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    result_pow_p1: {
        field: "result_pow_p1",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    result_pow_p2: {
        field: "result_pow_p2",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    result_pow_p3: {
        field: "result_pow_p3",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    result_pow_p4: {
        field: "result_pow_p4",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    result_pow_p5: {
        field: "result_pow_p5",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    result_pow_p6: {
        field: "result_pow_p6",
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    id_consumption: {
        field: "id_consumption",
        type: DataTypes.INTEGER,
        allowNull: true,
    },
  },
  {
    db,
    modelName: "Total_consumption",
    tableName: "total_consumption",
    timestamps: false,
  }
);

Total_consumption.sync();

module.exports = Total_consumption;