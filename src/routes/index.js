const { Router } = require('express');
const cors = require('cors');

const adminRouter = require('./Admin');
const baseRateRouter = require('./BaseRate');
const cityRouter = require('./City');
const stateRouter = require('./State');
const countryRouter = require('./Country');
const fleetRouter = require('./Fleet');
const internationalCodeRouter = require('./InternationalCode');
const notificationRouter = require('./Notification');
const pilotRouter = require('./Pilot');
const pilotTransactionHistoryRouter = require('./Pilot/pilotTransactionHistory');
const serviceRouter = require('./Service');
const unitRouter = require('./Unit');
const userRouter = require('./User');
const vehicleRouter = require('./Vehicle');
const vehicleFeaturesRouter = require('./Vehicle/vehicleFeatures');

const router = Router();

router.use(cors());

router.use('/admin', adminRouter);
router.use('/baseRates', baseRateRouter);
router.use('/city', cityRouter);
router.use('/state', stateRouter);
router.use('/country', countryRouter);
router.use('/fleet', fleetRouter);
router.use('/internationalCode', internationalCodeRouter);
router.use('/notification', notificationRouter);
router.use('/pilot', pilotRouter);
router.use('/pilotTransactionHistory', pilotTransactionHistoryRouter);
router.use('/service', serviceRouter);
router.use('/unit', unitRouter);
router.use('/user', userRouter);
router.use('/vehicle', vehicleRouter);
router.use('/vehicleFeatures', vehicleFeaturesRouter);

module.exports = router;