const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define(
    'vehicles',
    {
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      vehicleType: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: 'vehicles',
    },
  );
};