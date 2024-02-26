const baseRates = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { BaseRates, Vehicles } = require('../../db');

baseRates.use(express.json());
baseRates.use(cors());
baseRates.use(
  express.urlencoded({
    extended: true,
  }),
);

// Create a new Base Rate
baseRates.post('/newBaseRate', async (req, res) => {
  try {
    // Destructuring data from request body
    const {
      typeRate,
      price,
      observation,
      vehicleId,
    } = req.body;
    const [acctionCreated, created] = await BaseRates.findOrCreate({
      where: {
        typeRate,
        vehicleId,
      },
      defaults: {
        typeRate,
        price,
        observation,
        vehicleId,
      },
    });
    if (created) {
      res.status(200).send('Base Rate created');
    } else {
      res.status(422).send('Existing Base Rate');
    }
    // If an error block the execution of try go here
  } catch (error) {
      res.status(400).send(error);
  } 
});

// Read all Base Rates
baseRates.get('/allBaseRates', async (req, res) => {
  try {
    const ad = await BaseRates.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'typeRate', 'price', 'observation', 'vehicleId'],
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

//Read Base Rates by id
baseRates.get('/baseRatesById/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await BaseRates.findAll({
      where: {
        active: true,
        id: parseInt(id, 10),
      },
      attributes: ['id', 'typeRate', 'price', 'observation', 'vehicleId'],
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
baseRates.put('/toggleActive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const baseRateFinded = await BaseRates.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (baseRateFinded) {
      await baseRateFinded.update({
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

// Update price
baseRates.put('/updatePrice/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;

    const baseRateFinded = await BaseRates.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (baseRateFinded) {
      await baseRateFinded.update({
        price,
      });
      res.status(200).send('Updated price');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

baseRates.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = baseRates;