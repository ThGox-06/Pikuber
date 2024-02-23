const internationalCodes = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { InternationalCodes } = require('../../db');

internationalCodes.use(express.json());
internationalCodes.use(cors());
internationalCodes.use(
  express.urlencoded({
    extended: true,
  }),
);

internationalCodes.get('/allInternationalCodes', async (req, res) => {
  try {
    const ad = await InternationalCodes.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'code', 'countryId']
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

internationalCodes.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = internationalCodes;