const states = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { States, Countries } = require('../../db');

states.use(express.json());
states.use(cors());
states.use(
  express.urlencoded({
    extended: true,
  }),
);

// Create a new State
states.post('/newState', async (req, res) => {
  try {
    // Destructuring data from request body
    const {
      name,
      countryId,
    } = req.body;
    const [acctionCreated, created] = await States.findOrCreate({
      where: {
        name,
      },
      defaults: {
        name,
        countryId,
      },
    });
    if (created) {
      res.status(200).send('State created');
    } else {
      res.status(422).send('Existing State');
    }
    // If an error block the execution of try go here
  } catch (error) {
      res.status(400).send(error);
  } 
});

// Read all States
states.get('/allStates', async (req, res) => {
  try {
    const ad = await States.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'name', 'countryId'],
      include: [{
        model: Countries,
        attributes: ['name'],
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

// Read States by id
states.get('/stateById/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await States.findAll({
      where: {
        active: true,
        id: parseInt(id, 10),
      },
      attributes: ['id', 'name', 'countryId'],
      include: [{
        model: Countries,
        attributes: ['name'],
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
states.put('/toggleActive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const stateFinded = await States.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (stateFinded) {
      await stateFinded.update({
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

// Change name
states.put('/changeName/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const stateFinded = await States.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (stateFinded) {
      await stateFinded.update({
        name,
      });
      res.status(200).send('Name changed');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

states.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = states;