const { Router } = require('express');
const cors = require('cors');
const vehicleRouter = require('./vehicle');
const vehicleFeaturesRouter = require('./vehicleFeatures');

const router = Router();

router.use(cors());

router.use('/', vehicleRouter);
router.use('/vehicleFeatures', vehicleFeaturesRouter);

module.exports = router;