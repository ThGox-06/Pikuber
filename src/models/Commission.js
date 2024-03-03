const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define(
    'commissions',
    {
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      commissionType: {
        type: DataTypes.ENUM('travel', 'inscription', 'recharge', 'discount'),
      },
      price: {
        type: DataTypes.FLOAT,
      },
      observation: {
        type: DataTypes.TEXT,
      },
      creationDate: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      timestamps: false,
      tableName: 'commissions',
    },
  );
};