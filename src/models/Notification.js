const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define(
    'notification',
    {
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      date: {
        type: DataTypes.DATEONLY,
      },
      public: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      title: {
        type: DataTypes.STRING,
      },
      value: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      tableName: 'notifications',
    },
  );
};