const admin = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Admin } = require('../../db');

admin.use(express.json());
admin.use(cors());
admin.use(
  express.urlencoded({
    extended: true,
  }),
);

admin.get('/allAdmin', async (req, res) => {
  try {
    const ad = await Admin.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'creationDate', 'profile', 'userId']
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

admin.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = admin;