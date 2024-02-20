const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define(
    'admin',
    {
      active: {
        type: DataTypes.BOOLEAN,
      },
      creationDate: {
        type: DataTypes.DATEONLY,
      },
      adminCreator: {
        type: DataTypes.STRING,
      },
      profile: {
        type: DataTypes.JSON,
      },
    },
    {
      timestamps: false,
      tableName: 'admins',
    },
  );
};