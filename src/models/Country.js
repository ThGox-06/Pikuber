const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define(
    'countries',
    {
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: 'countries',
    },
  );
};