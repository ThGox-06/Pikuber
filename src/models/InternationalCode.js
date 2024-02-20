const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define(
    'internationalCode',
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