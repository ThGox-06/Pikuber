const { Router } = require('express');
const cors = require('cors');

const adminRouter = require('./Admin');
const baseRateRouter = require('./BaseRate');
const cityRouter = require('./City');
const stateRouter = require('./State');
const countryRouter = require('./Country');

const router = Router();

router.use(cors());

router.use('/admin', adminRouter);
router.use('/baseRates', baseRateRouter);
router.use('/city', cityRouter);
router.use('/state', stateRouter);
router.use('/country', countryRouter);

module.exports = router;