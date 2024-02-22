const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define(
    'pilots',
    {
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      creationDate: {
        type: DataTypes.DATEONLY,
      },
      activePilot: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      balance: {
        type: DataTypes.INTEGER,
      },
      inscription: {
        type: DataTypes.INTEGER,
      },
      licenseExp: {
        type: DataTypes.DATEONLY,
      },
      licenseNumber: {
        type: DataTypes.INTEGER,
      },
      pilotNumber: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      tableName: 'pilots',
    },
  );
};