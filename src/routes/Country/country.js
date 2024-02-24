const countries = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Countries } = require('../../db');

countries.use(express.json());
countries.use(cors());
countries.use(
  express.urlencoded({
    extended: true,
  }),
);

// Create a new Country
countries.post('/newCountry', async (req, res) => {
  try {
    // Destructuring data from request body
    const {
      name,
    } = req.body;
    const [acctionCreated, created] = await Countries .findOrCreate({
      where: {
        name,
      },
      defaults: {
        name,
      },
    });
    if (created) {
      res.status(200).send('Country created');
    } else {
      res.status(422).send('Existing Country');
    }
    // If an error block the execution of try go here
  } catch (error) {
      res.status(400).send(error);
  } 
});

// Read all Countries
countries.get('/allCountries', async (req, res) => {
  try {
    const ad = await Countries.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'name']
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

//Read countries by id
countries.get('/countriesById/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await Countries.findAll({
      where: {
        active: true,
        id: parseInt(id, 10),
      },
      attributes: ['id', 'name']
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
countries.put('/toggleActive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const countryFinded = await Countries.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (countryFinded) {
      await countryFinded.update({
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
countries.put('/changeName/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const countryFinded = await Countries.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (countryFinded) {
      await countryFinded.update({
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

countries.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = countries;