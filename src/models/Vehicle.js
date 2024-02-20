const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define(
    'vehicle',
    {
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      typeVehicle: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: 'vehicles',
    },
  );
};