const vehicleFeatures = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { VehicleFeatures } = require('../../db');

vehicleFeatures.use(express.json());
vehicleFeatures.use(cors());
vehicleFeatures.use(
  express.urlencoded({
    extended: true,
  }),
);

vehicleFeatures.get('/allVehicleFeatures', async (req, res) => {
  try {
    const ad = await VehicleFeatures.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'vehicleId', 'unitId', 'vehicleWeight', 'peopleCapacity', 'volume', 'packagingWeight', 'height', 'width', 'length', 'axes', 'rate', 'brand', 'color', 'model', 'licensePlate']
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

vehicleFeatures.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = vehicleFeatures;