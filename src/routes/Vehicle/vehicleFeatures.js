const vehicleFeatures = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { VehicleFeatures, Vehicles } = require('../../db');

vehicleFeatures.use(express.json());
vehicleFeatures.use(cors());
vehicleFeatures.use(
  express.urlencoded({
    extended: true,
  }),
);

// Create a new Vehicle Feature
vehicleFeatures.post('/newVehicleFeatures', async (req, res) => {
  try {
    // Destructuring data from request body
    const {
      id,
      vehicleId,
      unitId,
      vehicleWeight,
      peopleCapacity,
      volume,
      packagingWeight,
      height,
      width,
      length,
      axes,
      rate,
      brand,
      color,
      model,
      licensePlate,
    } = req.body;
    const [acctionCreated, created] = await VehicleFeatures.findOrCreate({
      where: {
        licensePlate,
      },
      defaults: {
        id,
        vehicleId,
        unitId,
        vehicleWeight,
        peopleCapacity,
        volume,
        packagingWeight,
        height,
        width,
        length,
        axes,
        rate,
        brand,
        color,
        model,
        licensePlate,
      },
    });
    if (created) {
      res.status(200).send('Vehicle Feature created');
    } else {
      res.status(422).send('Existing Vehicle Feature');
    }
    // If an error block the execution of try go here
  } catch (error) {
      res.status(400).send(error);
  } 
});

// Read all
vehicleFeatures.get('/allVehicleFeatures', async (req, res) => {
  try {
    const ad = await VehicleFeatures.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'vehicleId', 'unitId', 'vehicleWeight', 'peopleCapacity', 'volume', 'packagingWeight', 'height', 'width', 'length', 'axes', 'rate', 'brand', 'color', 'model', 'licensePlate'],
      include: [{
        model: Vehicles,
        attributes: ['vehicleType'],
      }]
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

// Read vehicle features by id
vehicleFeatures.get('/vehicleFeatureById/:id', async (req, res) => {
  try {
    const ad = await VehicleFeatures.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'vehicleId', 'unitId', 'vehicleWeight', 'peopleCapacity', 'volume', 'packagingWeight', 'height', 'width', 'length', 'axes', 'rate', 'brand', 'color', 'model', 'licensePlate'],
      include: [{
        model: Vehicles,
        attributes: ['vehicleType'],
      }]
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
vehicleFeatures.put('/toggleActive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const vehicleFeatureFinded = await VehicleFeatures.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (vehicleFeatureFinded) {
      await vehicleFeatureFinded.update({
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

// Change Data
vehicleFeatures.put('/changeData/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { vehicleWeight, peopleCapacity, volume, packagingWeight, axes, rate, brand, color, model, licensePlate} = req.body;

    const vehicleFeatureFinded = await VehicleFeatures.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (vehicleFeatureFinded) {
      await vehicleFeatureFinded.update({
        vehicleWeight,
        peopleCapacity,
        volume,
        packagingWeight,
        axes,
        rate,
        brand,
        color,
        model,
        licensePlate
      });
      res.status(200).send('Data changed');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

vehicleFeatures.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = vehicleFeatures;