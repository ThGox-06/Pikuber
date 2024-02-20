const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define(
    'vehicleFeature',
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
        type: DataTypes.INTEGER,
      },
      width: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
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