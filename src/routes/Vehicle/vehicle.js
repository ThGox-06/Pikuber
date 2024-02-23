const vehicle = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Vehicles } = require('../../db');

vehicle.use(express.json());
vehicle.use(cors());
vehicle.use(
  express.urlencoded({
    extended: true,
  }),
);

vehicle.get('/allVehicles', async (req, res) => {
  try {
    const ad = await Vehicles.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'vehicleType']
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

vehicle.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = vehicle;