const notifications = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Notifications } = require('../../db');

notifications.use(express.json());
notifications.use(cors());
notifications.use(
  express.urlencoded({
    extended: true,
  }),
);

notifications.get('/allNotifications', async (req, res) => {
  try {
    const ad = await Notifications.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'userId', 'adminId', 'date', 'public', 'title', 'value']
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

notifications.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = notifications;