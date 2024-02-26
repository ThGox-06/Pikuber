const fleets = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Fleets, Pilots, Users, VehicleFeatures } = require('../../db');

fleets.use(express.json());
fleets.use(cors());
fleets.use(
  express.urlencoded({
    extended: true,
  }),
);

// Create a new Fleet
fleets.post('/newFleet', async (req, res) => {
  try {
    // Destructuring data from request body
    const {
      pilotId,
      vehicleFeatureId,
      discount,
      recharge,
    } = req.body;
    const [acctionCreated, created] = await Fleets.findOrCreate({
      where: {
        pilotId,
        vehicleFeatureId,
      },
      defaults: {
        pilotId,
        vehicleFeatureId,
        discount,
        recharge
      },
    });
    if (created) {
      res.status(200).send('Fleet created');
    } else {
      res.status(422).send('Existing Fleet');
    }
    // If an error block the execution of try go here
  } catch (error) {
      res.status(400).send(error);
  } 
});

// Read all Fleets
fleets.get('/allFleets', async (req, res) => {
  try {
    const ad = await Fleets.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'pilotId', 'vehicleFeatureId', 'discount', 'recharge'],
      includes: [
        {
          model: Pilots,
          attributes: ['userId'],
          incldues: [
            {
              model: Users,
              attributes: ['name']
            }
          ]
        },
        {
          model: VehicleFeatures,
          attributes: ['vehicleId', 'unitId', 'vehicleWeight', 'peopleCapacity', 'volume', 'packagingWeight', 'height', 'width', 'length', 'axes', 'rate', 'brand', 'color', 'model', 'licensePlate']
        }
      ]
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

// Read Fleets by id
fleets.get('/fleetsById/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await Fleets.findAll({
      where: {
        active: true,
        id: parseInt(id, 10),
      },
      attributes: ['id', 'pilotId', 'vehicleFeatureId', 'discount', 'recharge'],
      includes: [
        {
          model: Pilots,
          attributes: ['userId'],
          incldues: [
            {
              model: Users,
              attributes: ['name']
            }
          ]
        },
        {
          model: VehicleFeatures,
          attributes: ['vehicleId', 'unitId', 'vehicleWeight', 'peopleCapacity', 'volume', 'packagingWeight', 'height', 'width', 'length', 'axes', 'rate', 'brand', 'color', 'model', 'licensePlate']
        }
      ]
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
fleets.put('/toggleActive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const fleetFinded = await Fleets.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (fleetFinded) {
      await fleetFinded.update({
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
fleets.put('/changeData/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {         
      pilotId,
      vehicleFeatureId,
      discount,
      recharge, 
    } = req.body;

    const fleetFinded = await Fleets.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (fleetFinded) {
      await fleetFinded.update({
        pilotId,
        vehicleFeatureId,
        discount,
        recharge, 
      });
      res.status(200).send('Data changed');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

fleets.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = fleets;