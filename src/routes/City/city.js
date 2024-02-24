const cities = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Cities, States } = require('../../db');

cities.use(express.json());
cities.use(cors());
cities.use(
  express.urlencoded({
    extended: true,
  }),
);

// Create a new City
cities.post('/newCity', async (req, res) => {
  try {
    // Destructuring data from request body
    const {
      name,
      stateId,
    } = req.body;
    const [acctionCreated, created] = await Cities.findOrCreate({
      where: {
        name,
      },
      defaults: {
        name,
        stateId,
      },
    });
    if (created) {
      res.status(200).send('City created');
    } else {
      res.status(422).send('Existing City');
    }
    // If an error block the execution of try go here
  } catch (error) {
      res.status(400).send(error);
  } 
});

// Read all cities
cities.get('/allCities', async (req, res) => {
  try {
    const ad = await Cities.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'name', 'stateId'],
      include: [{
        model: States,
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

// Read cities by id
cities.get('/cityById/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await Cities.findAll({
      where: {
        active: true,
        id: parseInt(id, 10),
      },
      attributes: ['id', 'name', 'stateId'],
      include: [{
        model: States,
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
cities.put('/toggleActive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const cityFinded = await Cities.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (cityFinded) {
      await cityFinded.update({
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
cities.put('/changeName/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const cityFinded = await Cities.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (cityFinded) {
      await cityFinded.update({
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

cities.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = cities;