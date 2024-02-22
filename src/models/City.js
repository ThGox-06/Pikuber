const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define(
    'cities',
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
      tableName: 'cities',
    },
  );
};