const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define(
    'units',
    {
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      unit: {
        type: DataTypes.STRING,
      },
      details: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: 'units',
    },
  );
};