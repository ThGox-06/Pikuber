const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define(
    'users',
    {
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      creationDate: {
        type: DataTypes.DATEONLY,
      },
      avatar: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      birthday: {
        type: DataTypes.DATEONLY,
      },
      documentNumber: {
        type: DataTypes.STRING,
      },
      documentImage: {
        type: DataTypes.STRING,
      },
      documentType: {
        type: DataTypes.ENUM('ci', 'dni', 'passport'),
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.ENUM('male', 'female', 'others'),
      },
      phone: {
        type: DataTypes.STRING,
      },
      phoneWhatsapp: {
        type: DataTypes.STRING,
      },
      verifiedUser: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: false,
      tableName: 'users',
    },
  );
};