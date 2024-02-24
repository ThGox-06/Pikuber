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

// Create a new vehicle
vehicle.post('/newVehicle', async (req, res) => {
  try {
    // Destructuring data from request body
    const {
      vehicleType,
    } = req.body;
    const [acctionCreated, created] = await Vehicles.findOrCreate({
      where: {
        vehicleType,
      },
      defaults: {
        vehicleType,
      },
    });
    if (created) {
      res.status(200).send('Vehicle created');
    } else {
      res.status(422).send('Existing Vehicle');
    }
    // If an error block the execution of try go here
  } catch (error) {
      res.status(400).send(error);
  } 
});

// Read all vehicles
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

// Read vehicles by id
vehicle.get('/vehiclesById/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await Vehicles.findAll({
      where: {
        active: true,
        id: parseInt(id, 10),
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

// Toggle active
vehicle.put('/toggleActive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const vehicleFinded = await Vehicles.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (vehicleFinded) {
      await vehicleFinded.update({
        active,
      });
      res.status(200).send('Alternate State');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Change vehicle type
vehicle.put('/changeVehicleType/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { vehicleType } = req.body;

    const vehicleFinded = await Vehicles.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (vehicleFinded) {
      await vehicleFinded.update({
        vehicleType,
      });
      res.status(200).send('Vehicle Type changed');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

vehicle.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = vehicle;