const services = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Services } = require('../../db');

services.use(express.json());
services.use(cors());
services.use(
  express.urlencoded({
    extended: true,
  }),
);

services.get('/allServices', async (req, res) => {
  try {
    const ad = await Services.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'userId', 'pilotId', 'fleetId', 'cityId', 'unitId', 'description', 'startLocation', 'endLocation', 'creationDate', 'pilotAssigned', 'programmed', 'motoType', 'ratingUser', 'ratingPilot', 'userPosition', 'pilotPosition', 'userPreferences', 'pilotPreferences', 'realTime', 'cancel', 'error', 'success']
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

services.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = services;