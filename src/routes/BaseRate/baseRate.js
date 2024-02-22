const baseRates = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { BaseRates } = require('../../db');

baseRates.use(express.json());
baseRates.use(cors());
baseRates.use(
  express.urlencoded({
    extended: true,
  }),
);

baseRates.get('/allBaseRates', async (req, res) => {
  try {
    const ad = await BaseRates.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'typeRate', 'price', 'observation', 'vehicleId']
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

baseRates.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = baseRates;