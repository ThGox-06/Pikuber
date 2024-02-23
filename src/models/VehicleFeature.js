const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define(
    'vehicleFeatures',
    {
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      vehicleWeight: {
        type: DataTypes.INTEGER,
      },
      peopleCapacity: {
        type: DataTypes.INTEGER,
      },
      volume: {
        type: DataTypes.INTEGER,
      },
      packagingWeight: {
        type: DataTypes.INTEGER,
      },
      height: {
        type: DataTypes.FLOAT,
      },
      width: {
        type: DataTypes.FLOAT,
      },
      length: {
        type: DataTypes.FLOAT,
      },
      axes: {
        type: DataTypes.INTEGER,
      },
      rate: {
        type: DataTypes.INTEGER,
      },
      brand: {
        type: DataTypes.STRING,
      },
      color: {
        type: DataTypes.STRING,
      },
      model: {
        type: DataTypes.STRING,
      },
      licensePlate: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: 'vehicleFeatures',
    },
  );
};