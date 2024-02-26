/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
require('dotenv').config();
const { PatchCustomDomainsByIdRequestTlsPolicyEnum } = require('auth0');
const fs = require('fs');
const { User } = require('mercadopago');
const path = require('path');
const { Sequelize } = require('sequelize');

const {
  // eslint-disable-next-line no-unused-vars
  DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_DEPLOY,
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  logging: false, // true para ver logs de creacion de tablas y otros
  host: DB_HOST,
  dialect: 'mysql',
  port: DB_PORT,
  // dialectOptions: {
  //   mysql2: '^2.3.3',
  // },
});

const basename = path.basename(__dirname);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models
fs.readdirSync(path.join(__dirname, 'models'))
  .filter(
    (file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, 'models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
const entries = Object.entries(sequelize.models);
const capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);
console.log(sequelize.models);
// todo relations
const { 
  Admin,
  Advertisements,
  BaseRates, 
  Cities,
  Countries,
  Fleets,
  InternationalCodes,
  Notifications,
  Pilots,
  PilotTransactionHistory,
  Services,
  States,
  Units,
  Users,
  Vehicles, 
  VehicleFeatures,
} = sequelize.models;

// ADMIN
Users.hasMany(Admin);
Admin.belongsTo(Users);
// ADVERTISEMENTS (has no connections)
// BASE RATE
Vehicles.hasMany(BaseRates);
BaseRates.belongsTo(Vehicles);
// CITY
States.hasMany(Cities);
Cities.belongsTo(States);
// COUNTRY (has no connections)
// FLEET
Pilots.hasMany(Fleets);
Fleets.belongsTo(Pilots);
VehicleFeatures.hasMany(Fleets);
Fleets.belongsTo(VehicleFeatures);
// INTERNATIONAL CODE
Countries.hasMany(InternationalCodes);
InternationalCodes.belongsTo(Countries);
// NOTIFICATION
Users.hasMany(Notifications);
Notifications.belongsTo(Users);
Admin.hasMany(Notifications);
Notifications.belongsTo(Admin);
// PILOT
Users.hasMany(Pilots);
Pilots.belongsTo(Users);
// PILOT TRANSACTION HISTORY
Pilots.hasMany(PilotTransactionHistory);
PilotTransactionHistory.belongsTo(Pilots);
// SERVICE
Users.hasMany(Services);
Services.belongsTo(Users);
Pilots.hasMany(Services);
Services.belongsTo(Pilots);
Fleets.hasMany(Services);
Services.belongsTo(Fleets);
Cities.hasMany(Services);
Services.belongsTo(Cities);
Units.hasMany(Services);
Services.belongsTo(Units);
// STATE
Countries.hasMany(States);
States.belongsTo(Countries);
// UNIT (has no connections)
// USER
Cities.hasMany(Users);
Users.belongsTo(Cities);
InternationalCodes.hasMany(Users);
Users.belongsTo(InternationalCodes);
// VEHICLE (has no connections)
// VEHICLE FEATURES
Vehicles.hasMany(VehicleFeatures);
VehicleFeatures.belongsTo(Vehicles);
Units.hasMany(VehicleFeatures);
VehicleFeatures.belongsTo(Units);

module.exports = {
  ...sequelize.models,
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
