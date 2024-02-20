const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define(
    'fleet',
    {
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      discount: {
        type: DataTypes.FLOAT,
      },
      recharge: {
        type: DataTypes.FLOAT,
      },
    },
    {
      timestamps: false,
      tableName: 'fleets',
    },
  );
};