const pilots = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Pilots, Users } = require('../../db');
const { User } = require('mercadopago');
const { parse } = require('dotenv');

pilots.use(express.json());
pilots.use(cors());
pilots.use(
  express.urlencoded({
    extended: true,
  }),
);

// Create a new State
pilots.post('/newPilot', async (req, res) => {
  try {
    // Destructuring data from request body
    const {
      id,
      userId,
      creationDate,
      activePilot,
      balance,
      inscription,
      licenseExp,
      licenseNumber,
      pilotNumber,
    } = req.body;
    const [acctionCreated, created] = await Pilots.findOrCreate({
      where: {
        userId,
      },
      defaults: {
        id,
        userId,
        creationDate,
        activePilot,
        balance,
        inscription,
        licenseExp,
        licenseNumber,
        pilotNumber
      },
    });
    if (created) {
      res.status(200).send('Pilot created');
    } else {
      res.status(422).send('Existing Pilot');
    }
    // If an error block the execution of try go here
  } catch (error) {
      res.status(400).send(error);
  } 
});


// Read all pilots
pilots.get('/allPilots', async (req, res) => {
  try {
    const ad = await Pilots.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'userId', 'creationDate', 'activePilot', 'balance', 'inscription', 'licenseExp', 'licenseNumber', 'pilotNumber'],
      include: [
        {
          model: Users,
          attributes: ['name'],
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

// Read pilots by id
pilots.get('/pilotById/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await Pilots.findAll({
      where: {
        active: true,
        id: parseInt(id, 10),
      },
      attributes: ['id', 'userId', 'creationDate', 'activePilot', 'balance', 'inscription', 'licenseExp', 'licenseNumber', 'pilotNumber'],
      include: [
        {
          model: Users,
          attributes: ['name'],
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
pilots.put('/toggleActive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const pilotFinded = await Pilots.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (pilotFinded) {
      await pilotFinded.update({
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

// Change data
pilots.put('/changeData/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, activePilot, balance, inscription, licenseExp, licenseNumber, pilotNumber} = req.body;

    const pilotFinded = await Pilots.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (pilotFinded) {
      await pilotFinded.update({
        userId, 
        activePilot, 
        balance, 
        inscription, 
        licenseExp, 
        licenseNumber, 
        pilotNumber,
      });
      res.status(200).send('Changed data');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});


pilots.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = pilots;