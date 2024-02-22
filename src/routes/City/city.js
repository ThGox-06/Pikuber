const cities = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Cities } = require('../../db');

cities.use(express.json());
cities.use(cors());
cities.use(
  express.urlencoded({
    extended: true,
  }),
);

cities.get('/allCities', async (req, res) => {
  try {
    const ad = await Cities.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'name', 'stateId']
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

cities.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = cities;