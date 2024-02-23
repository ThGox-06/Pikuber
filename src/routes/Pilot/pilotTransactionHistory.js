const pilotTransactionHistory = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { PilotTransactionHistory } = require('../../db');

pilotTransactionHistory.use(express.json());
pilotTransactionHistory.use(cors());
pilotTransactionHistory.use(
  express.urlencoded({
    extended: true,
  }),
);

pilotTransactionHistory.get('/allPilotTransactionHistory', async (req, res) => {
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

pilotTransactionHistory.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = pilotTransactionHistory;