const admin = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Admin, Users } = require('../../db');

admin.use(express.json());
admin.use(cors());
admin.use(
  express.urlencoded({
    extended: true,
  }),
);

// Create a new Admin
admin.post('/newAdmin', async (req, res) => {
  try {
    // Destructuring data from request body
    const {
      creationDate,
      profile,
      userId,
    } = req.body;
    const [acctionCreated, created] = await Admin.findOrCreate({
      where: {
        userId,
      },
      defaults: {
        creationDate,
        profile,
        userId,
      },
    });
    if (created) {
      res.status(200).send('Admin created');
    } else {
      res.status(422).send('Existing Admin');
    }
    // If an error block the execution of try go here
  } catch (error) {
      res.status(400).send(error);
  } 
});


// Read all admins
admin.get('/allAdmins', async (req, res) => {
  try {
    const ad = await Admin.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'creationDate', 'profile', 'userId'],
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

//Read admin by id
admin.get('/adminById/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await Admin.findAll({
      where: {
        active: true,
        id: parseInt(id, 10),
      },
      attributes: ['id', 'creationDate', 'profile', 'userId'],
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

// Toggle Active
admin.put('/toggleActive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const adminFinded = await Admin.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (adminFinded) {
      await adminFinded.update({
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

// Update profile
admin.put('/updateProfile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { profile } = req.body;

    const adminFinded = await Admin.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (adminFinded) {
      await adminFinded.update({
        profile,
      });
      res.status(200).send('Updated profile');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});


admin.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = admin;