const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define(
    'advertisements',
    {
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      advertisementName: {
        type: DataTypes.STRING,
      },
      companyName: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: 'advertisements',
    },
  );
};