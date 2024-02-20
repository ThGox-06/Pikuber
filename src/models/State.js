const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define(
    'state',
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
      tableName: 'states',
    },
  );
};