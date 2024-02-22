const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define(
    'fleets',
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