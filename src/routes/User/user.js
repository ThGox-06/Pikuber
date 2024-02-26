const users = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Users, Cities, InternationalCodes} = require('../../db');

users.use(express.json());
users.use(cors());
users.use(
  express.urlencoded({
    extended: true,
  }),
);


// Create a new User
users.post('/newUser', async (req, res) => {
  try {
    // Destructuring data from request body
    const {
      cityId,
      internationalCodeId,
      creationDate,
      avatar,
      name,
      lastname,
      birthday,
      documentNumber,
      documentImage,
      documentType,
      email,
      gender,
      phone,
      phoneWhatsapp,
      verifiedUser
    } = req.body;
    const [acctionCreated, created] = await Users.findOrCreate({
      where: {
        phone,
      },
      defaults: {
        cityId,
        internationalCodeId,
        creationDate,
        avatar,
        name,
        lastname,
        birthday,
        documentNumber,
        documentImage,
        documentType,
        email,
        gender,
        phone,
        phoneWhatsapp,
        verifiedUser
      },
    });
    if (created) {
      res.status(200).send('User created');
    } else {
      res.status(422).send('Existing User');
    }
    // If an error block the execution of try go here
  } catch (error) {
      res.status(400).send(error);
  } 
});

// Read all Users
users.get('/allUsers', async (req, res) => {
  try {
    const ad = await Users.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'cityId', 'internationalCodeId', 'creationDate', 'avatar', 'name', 'lastname', 'birthday', 'documentNumber', 'documentImage', 'documentType', 'email', 'gender', 'phone', 'phoneWhatsapp', 'verifiedUser'],
      include: [
        {
          model: Cities,
          attributes: ['name'],
        },
        {
          model: InternationalCodes,
          attributes: ['code']
        }
      ]
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

// Read Users by Id
users.get('/usersById/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await Users.findAll({
      where: {
        active: true,
        id: parseInt(id, 10),
      },
      attributes: ['id', 'cityId', 'internationalCodeId', 'creationDate', 'avatar', 'name', 'lastname', 'birthday', 'documentNumber', 'documentImage', 'documentType', 'email', 'gender', 'phone', 'phoneWhatsapp', 'verifiedUser'],
      include: [
        {
          model: Cities,
          attributes: ['name'],
        },
        {
          model: InternationalCodes,
          attributes: ['code']
        }
      ]
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
users.put('/toggleActive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const userFinded = await Users.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (userFinded) {
      await userFinded.update({
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

// Change Data (cityId, internationalCodeId, avatar, documentImage, email, gender, phone, phoneWhatsapp, verifiedUser)
users.put('/changeData/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      cityId,
      internationalCodeId,
      avatar,
      documentImage,
      email,
      gender,
      phone,
      phoneWhatsapp,
      verifiedUser } = req.body;

    const userFinded = await Users.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (userFinded) {
      await userFinded.update({
        cityId,
        internationalCodeId,
        avatar,
        documentImage,
        email,
        gender,
        phone,
        phoneWhatsapp,
        verifiedUser,
      });
      res.status(200).send('Data changed');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

users.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = users;