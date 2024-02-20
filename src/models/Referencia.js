const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define(
    '',
    {
      name: {
        type: DataTypes.STRING,
      },
      amount: {
        type: DataTypes.INTEGER,
      },
      cost: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      detail: {
        type: DataTypes.TEXT,
      },
      dishes: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      birthDate: {
        type: DataTypes.DATEONLY,
      },
      status: {
        type: DataTypes.ENUM('noActive', 'active', 'banned'),
        allowNull: true,
        defaultValue: 'noActive',
      },
      validatedEmail: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
      tableName: '',
    },
  );
};
