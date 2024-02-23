const users = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Users } = require('../../db');

users.use(express.json());
users.use(cors());
users.use(
  express.urlencoded({
    extended: true,
  }),
);

users.get('/allUsers', async (req, res) => {
  try {
    const ad = await Users.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'cityId', 'internationalCodeId', 'creationDate', 'avatar', 'name', 'lastname', 'birthday', 'documentNumber', 'documentImage', 'documentType', 'email', 'gender', 'phone', 'phoneWhatsapp', 'verifiedUser']
    })

    if (ad.length > 0) {
      res.status(201).json(ad);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
})

users.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = users;