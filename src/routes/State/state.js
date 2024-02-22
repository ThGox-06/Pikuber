const states = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { States } = require('../../db');

states.use(express.json());
states.use(cors());
states.use(
  express.urlencoded({
    extended: true,
  }),
);

states.get('/allStates', async (req, res) => {
  try {
    const ad = await States.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'name', 'countryId']
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

states.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = states;