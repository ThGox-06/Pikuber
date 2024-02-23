const pilots = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Pilots } = require('../../db');

pilots.use(express.json());
pilots.use(cors());
pilots.use(
  express.urlencoded({
    extended: true,
  }),
);

pilots.get('/allPilots', async (req, res) => {
  try {
    const ad = await Pilots.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'userId', 'creationDate', 'activePilot', 'balance', 'inscription', 'licenseExp', 'licenseNumber', 'pilotNumber']
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

pilots.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = pilots;