const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define(
    'pilotTransactionHistories',
    {
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      value: {
        type: DataTypes.FLOAT,
      },
      date: {
        type: DataTypes.DATEONLY,
      },
      ticket: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: 'pilotTransactionsHistories',
    },
  );
};