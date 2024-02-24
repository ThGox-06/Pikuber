const internationalCodes = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { InternationalCodes, Countries } = require('../../db');

internationalCodes.use(express.json());
internationalCodes.use(cors());
internationalCodes.use(
  express.urlencoded({
    extended: true,
  }),
);


// Create a new International Code
internationalCodes.post('/newIntCode', async (req, res) => {
  try {
    // Destructuring data from request body
    const {
      code,
      countryId,
    } = req.body;
    const [acctionCreated, created] = await InternationalCodes.findOrCreate({
      where: {
        code,
      },
      defaults: {
        code,
        countryId,
      },
    });
    if (created) {
      res.status(200).send('International Code created');
    } else {
      res.status(422).send('Existing International Code');
    }
    // If an error block the execution of try go here
  } catch (error) {
      res.status(400).send(error);
  } 
});

// Read all international codes
internationalCodes.get('/allIntCodes', async (req, res) => {
  try {
    const ad = await InternationalCodes.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'code', 'countryId'],
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

// Read codes by id
internationalCodes.get('/intCodeById/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await InternationalCodes.findAll({
      where: {
        active: true,
        id: parseInt(id, 10),
      },
      attributes: ['id', 'code', 'countryId'],
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
internationalCodes.put('/toggleActive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const intCodeFinded = await InternationalCodes.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (intCodeFinded) {
      await intCodeFinded.update({
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

// Change code
internationalCodes.put('/changeCode/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { code } = req.body;

    const intCodeFinded = await InternationalCodes.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (intCodeFinded) {
      await intCodeFinded.update({
        code,
      });
      res.status(200).send('Code changed');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});


internationalCodes.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = internationalCodes;