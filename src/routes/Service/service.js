const services = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Services, Users, Pilots, Fleets, Cities, Units } = require('../../db');

services.use(express.json());
services.use(cors());
services.use(
  express.urlencoded({
    extended: true,
  }),
);

// Create a new Service
services.post('/newService', async (req, res) => {
  try {
    // Destructuring data from request body
    const {
      userId,
      pilotId,
      fleetId,
      cityId,
      unitId,
      description,
      startLocation,
      endLocation,
      creationDate,
      pilotAssigned,
      programmed,
      motoType,
      ratingUser,
      ratingPilot,
      userPosition,
      pilotPosition,
      userPreferences,
      pilotPreferences,
      realTime,
      cancel,
      error,
      success
    } = req.body;
    const [acctionCreated, created] = await Services.findOrCreate({
      where: {
        userId,
      },
      defaults: {
        userId,
        pilotId,
        fleetId,
        cityId,
        unitId,
        description,
        startLocation,
        endLocation,
        creationDate,
        pilotAssigned,
        programmed,
        motoType,
        ratingUser,
        ratingPilot,
        userPosition,
        pilotPosition,
        userPreferences,
        pilotPreferences,
        realTime,
        cancel,
        error,
        success
      },
    });
    if (created) {
      res.status(200).send('Service created');
    } else {
      res.status(422).send('Existing Service');
    }
    // If an error block the execution of try go here
  } catch (error) {
      res.status(400).send(error);
  } 
});


// Read all Services
services.get('/allServices', async (req, res) => {
  try {
    const ad = await Services.findAll({
      where: {
        active: true
      },
      attributes: ['id', 'userId', 'pilotId', 'fleetId', 'cityId', 'unitId', 'description', 'startLocation', 'endLocation', 'creationDate', 'pilotAssigned', 'programmed', 'motoType', 'ratingUser', 'ratingPilot', 'userPosition', 'pilotPosition', 'userPreferences', 'pilotPreferences', 'realTime', 'cancel', 'error', 'success'],
      include: [
        {
          model: Users,
          attributes: ['name'],
        },
        {
          model: Pilots,
          attributes: ['userId'],
          include: [
            {
              model: Users,
              attributes: ['name'],
            }
          ]
        },
        {
          model: Fleets,
          attributes: ['vehicleFeatureId'],
        },
        {
          model: Cities,
          attributes: ['name'],
        },
        {
          model: Units,
          attributes: ['unit', 'details'],
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

// Read all Services
services.get('/servicesById/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await Services.findAll({
      where: {
        active: true,
        id: parseInt(id, 10),
      },
      attributes: ['id', 'userId', 'pilotId', 'fleetId', 'cityId', 'unitId', 'description', 'startLocation', 'endLocation', 'creationDate', 'pilotAssigned', 'programmed', 'motoType', 'ratingUser', 'ratingPilot', 'userPosition', 'pilotPosition', 'userPreferences', 'pilotPreferences', 'realTime', 'cancel', 'error', 'success'],
      include: [
        {
          model: Users,
          attributes: ['name'],
        },
        {
          model: Pilots,
          attributes: ['userId'],
          include: [
            {
              model: Users,
              attributes: ['name'],
            }
          ]
        },
        {
          model: Fleets,
          attributes: ['vehicleFeatureId'],
        },
        {
          model: Cities,
          attributes: ['name'],
        },
        {
          model: Units,
          attributes: ['unit', 'details'],
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
services.put('/toggleActive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const serviceFinded = await Services.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (serviceFinded) {
      await serviceFinded.update({
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

// Change data
services.put('/changeData/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {   
      pilotId,   
      fleetId,
      cityId,
      description,
      startLocation,
      endLocation,
      creationDate,
      pilotAssigned,
      programmed,
      motoType,
      ratingUser,
      ratingPilot,
      userPosition,
      pilotPosition,
      userPreferences,
      pilotPreferences,
      realTime,
      cancel,
      error,
      success } = req.body;

    const serviceFinded = await Services.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (serviceFinded) {
      await serviceFinded.update({
        pilotId,
        fleetId,
        cityId,
        description,
        startLocation,
        endLocation,
        creationDate,
        pilotAssigned,
        programmed,
        motoType,
        ratingUser,
        ratingPilot,
        userPosition,
        pilotPosition,
        userPreferences,
        pilotPreferences,
        realTime,
        cancel,
        error,
        success
      });
      res.status(200).send('Data changed');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

services.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = services;