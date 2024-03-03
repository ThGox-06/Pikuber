const commissions = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Commissions, Vehicles } = require('../../db');

commissions.use(express.json());
commissions.use(cors());
commissions.use(
  express.urlencoded({
    extended: true,
  }),
);

// Create a new Commission
commissions.post('/newCommission', async (req, res) => {
  try {
    // Destructuring data from request body
    const {
      commissionType,
      price,
      observation,
      creationDate,
      vehicleId,
    } = req.body;
    const [acctionCreated, created] = await Commissions.findOrCreate({
      where: {
        creationDate,
        vehicleId,
      },
      defaults: {
        commissionType,
        price,
        observation,
        creationDate,
        vehicleId,
      },
    });
    if (created) {
      res.status(200).send('Commission created');
    } else {
      res.status(422).send('Existing Commission');
    }
    // If an error block the execution of try go here
  } catch (error) {
      res.status(400).send(error);
  } 
});

// Read all commissions
commissions.get('/allCommissions', async (req, res) => {
  try {
    const ad = await Commissions.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'commissionType', 'price', 'observation', 'creationDate', 'vehicleId'],
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

// Read commissions by id
commissions.get('/commissionById/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await Commissions.findAll({
      where: {
        active: true,
        id: parseInt(id, 10),
      },
      attributes: ['id', 'commissionType', 'price', 'observation', 'creationDate', 'vehicleId'],
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
commissions.put('/toggleActive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const commissionFinded = await Commissions.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (commissionFinded) {
      await commissionFinded.update({
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
commissions.put('/changeData/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
            commissionType,
            price,
            observation,
            vehicleId, 
          } = req.body;

    const commissionFinded = await Commissions.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (commissionFinded) {
      await commissionFinded.update({
        commissionType,
        price,
        observation,
        vehicleId, 
      });
      res.status(200).send('Data Changed');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});


commissions.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = commissions;