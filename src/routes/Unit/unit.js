const units = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Units } = require('../../db');

units.use(express.json());
units.use(cors());
units.use(
  express.urlencoded({
    extended: true,
  }),
);

units.get('/allUnits', async (req, res) => {
  try {
    const ad = await Units.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'unit', 'details']
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

units.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = units;