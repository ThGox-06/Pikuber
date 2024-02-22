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

countries.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = countries;