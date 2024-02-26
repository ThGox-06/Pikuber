const units = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Units } = require('../../db');
const { parse } = require('dotenv');

units.use(express.json());
units.use(cors());
units.use(
  express.urlencoded({
    extended: true,
  }),
);

// Create a new Unit
units.post('/newUnit', async (req, res) => {
  try {
    // Destructuring data from request body
    const {
      unit,
      details,
    } = req.body;
    const [acctionCreated, created] = await Units.findOrCreate({
      where: {
        unit,
      },
      defaults: {
        unit,
        details,
      },
    });
    if (created) {
      res.status(200).send('Unit created');
    } else {
      res.status(422).send('Existing Unit');
    }
    // If an error block the execution of try go here
  } catch (error) {
      res.status(400).send(error);
  } 
});

// Read all units
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

// Read units by id
units.get('/unitById/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await Units.findAll({
      where: {
        active: true,
        id: parseInt(id, 10),
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

// Toggle active
units.put('/toggleActive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const unitFinded = await Units.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (unitFinded) {
      await unitFinded.update({
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

// Change Data (unit, details)
units.put('/changeUnitOrDetail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { unit, details } = req.body;

    const unitFinded = await Units.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (unitFinded) {
      await unitFinded.update({
        unit,
        details,
      });
      res.status(200).send('Data Changed');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

units.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = units;