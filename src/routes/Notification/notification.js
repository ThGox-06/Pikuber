const notifications = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Notifications, Users } = require('../../db');

notifications.use(express.json());
notifications.use(cors());
notifications.use(
  express.urlencoded({
    extended: true,
  }),
);

// Create a new Notification
notifications.post('/newNotification', async (req, res) => {
  try {
    // Destructuring data from request body
    const {
      id,
      userId,
      adminId,
      date,
      public,
      title,
      value
    } = req.body;
    const [acctionCreated, created] = await Notifications.findOrCreate({
      where: {
        userId,
      },
      defaults: {
        id,
        userId,
        adminId,
        date,
        public,
        title,
        value
      },
    });
    if (created) {
      res.status(200).send('Notification created');
    } else {
      res.status(422).send('Existing Notification');
    }
    // If an error block the execution of try go here
  } catch (error) {
      res.status(400).send(error);
  } 
});

// Read all notifications
notifications.get('/allNotifications', async (req, res) => {
  try {
    const ad = await Notifications.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'userId', 'adminId', 'date', 'public', 'title', 'value'],
      include: [{
        model: Users,
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

// Read notifications by id
notifications.get('/notificationsById/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await Notifications.findAll({
      where: {
        active: true,
        id: parseInt(id, 10),
      },
      attributes: ['id', 'userId', 'adminId', 'date', 'public', 'title', 'value'],
      include: [{
        model: Users,
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
notifications.put('/toggleActive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const notificationFinded = await Notifications.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (notificationFinded) {
      await notificationFinded.update({
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
notifications.put('/changeData/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, public, title, value } = req.body;

    const notificationFinded = await Notifications.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (notificationFinded) {
      await notificationFinded.update({
        userId,
        public,
        title,
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

notifications.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = notifications;