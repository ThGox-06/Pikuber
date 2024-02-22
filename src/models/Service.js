const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define(
    'services',
    {
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      description: {
        type: DataTypes.TEXT,
      },
      startLocation: {
        type: DataTypes.JSON,
      },
      endLocation: {
        type: DataTypes.JSON,
      },
      creationDate: {
        type: DataTypes.DATEONLY,
      },
      pilotAssigned: {
        type: DataTypes.BOOLEAN,
      },
      programed: {
        type: DataTypes.BOOLEAN,
      },
      motoType: {
        type: DataTypes.STRING,
      },
      ratingUser: {
        type: DataTypes.INTEGER,
      },
      ratingPilot: {
        type: DataTypes.INTEGER,
      },
      userPosition: {
        type: DataTypes.JSON,
      },
      pilotPosition: {
        type: DataTypes.JSON,
      },
      userPreferences: {
        type: DataTypes.JSON,
      },
      pilotPreferences: {
        type: DataTypes.JSON,
      },
      realTime: {
        type: DataTypes.JSON,
      },
      cancel: {
        type: DataTypes.BOOLEAN,
      },
      error: {
        type: DataTypes.BOOLEAN,
      },
      success: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: false,
      tableName: 'services',
    },
  );
};