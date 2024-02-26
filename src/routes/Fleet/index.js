const { Router } = require('express');
const cors = require('cors');
const fleetRouter = require('./fleet');

const router = Router();

router.use(cors());

router.use('/', fleetRouter);

module.exports = router;