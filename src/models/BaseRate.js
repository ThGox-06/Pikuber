const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define(
    'baseRates',
    {
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      typeRate: {
        type: DataTypes.ENUM('flat', 'perKm'),
      },
      price: {
        type: DataTypes.FLOAT,
      },
      observation: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: false,
      tableName: 'baseRates',
    },
  );
};