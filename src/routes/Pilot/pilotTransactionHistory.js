const pilotTransactionHistory = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { PilotTransactionHistory, Pilots } = require('../../db');

pilotTransactionHistory.use(express.json());
pilotTransactionHistory.use(cors());
pilotTransactionHistory.use(
  express.urlencoded({
    extended: true,
  }),
);

// Create a new Transaction
pilotTransactionHistory.post('/newTransaction', async (req, res) => {
  try {
    // Destructuring data from request body
    const {
      pilotId,
      value,
      date,
      ticket,
    } = req.body;
    const [acctionCreated, created] = await PilotTransactionHistory.findOrCreate({
      where: {
        ticket,
      },
      defaults: {
        pilotId,
        value,
        date,
        ticket,
      },
    });
    if (created) {
      res.status(200).send('Transaction created');
    } else {
      res.status(422).send('Existing Transaction');
    }
    // If an error block the execution of try go here
  } catch (error) {
      res.status(400).send(error);
  } 
});


// Read all transaction histories
pilotTransactionHistory.get('/allTransactionHistory', async (req, res) => {
  try {
    const ad = await PilotTransactionHistory.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'pilotId', 'value', 'date', 'ticket']
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

// Read all transaction histories
pilotTransactionHistory.get('/transactionHistoryById/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await PilotTransactionHistory.findAll({
      where: {
        active: true,
        id: parseInt(id, 10),
      },
      attributes: ['id', 'pilotId', 'value', 'date', 'ticket']
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
pilotTransactionHistory.put('/toggleActive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const transactionFinded = await PilotTransactionHistory.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (transactionFinded) {
      await transactionFinded.update({
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

// Change Data (pilotId and value)
pilotTransactionHistory.put('/changeData/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { pilotId, value } = req.body;

    const transactionFinded = await PilotTransactionHistory.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (transactionFinded) {
      await transactionFinded.update({
        pilotId,
        value,
      });
      res.status(200).send('Data changed');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

pilotTransactionHistory.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = pilotTransactionHistory;