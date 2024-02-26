const advertisements = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Advertisements } = require('../../db');

advertisements.use(express.json());
advertisements.use(cors());
advertisements.use(
  express.urlencoded({
    extended: true,
  }),
);

// Create a new Advertisement
advertisements.post('/newAdvertisement', async (req, res) => {
  try {
    // Destructuring data from request body
    const {
      advertisementName,
      companyName,
    } = req.body;
    // Checking if an admin with the same userId already exists
    const [acctionCreated, created] = await Advertisements.findOrCreate({
      where: {
        advertisementName,
      },
      defaults: {
        advertisementName,
        companyName,
      },
    });
    // Tests if an admin was created or already exist with the same userId
    if (created) {
      res.status(200).send('Advertisement created');
    } else {
      res.status(422).send('Existing Advertisement');
    }
    // If an error block the execution of try go here
  } catch (error) {
      res.status(400).send(error);
  } 
});


// Read all Advertisements
advertisements.get('/allAdvertisement', async (req, res) => {
  try {
    const ad = await Advertisements.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'advertisementName', 'companyName'],
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

// Read Advertisements by ID
advertisements.get('/advertisementsById/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await Advertisements.findAll({
      where: {
        active: true,
        id: parseInt(id, 10),
      },
      attributes: ['id', 'advertisementName', 'companyName'],
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

// Toggle admin
advertisements.put('/toggleActive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const advertisementFinded = await Advertisements.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (advertisementFinded) {
      await advertisementFinded.update({
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
advertisements.put('/changeData/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { advertisementName, companyName, } = req.body;

    const advertisementFinded = await Advertisements.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (advertisementFinded) {
      await advertisementFinded.update({
        advertisementName,
        companyName,
      });
      res.status(200).send('Data Changed');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});


advertisements.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = advertisements;