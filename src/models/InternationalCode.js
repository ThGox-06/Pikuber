const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define(
    'internationalCodes',
    {
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      code: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: 'internationalCodes',
    },
  );
};