const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define(
    'admin',
    {
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      creationDate: {
        type: DataTypes.DATEONLY,
      },
      profile: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: 'admins',
    },
  );
};