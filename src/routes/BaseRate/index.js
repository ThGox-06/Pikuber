const { Router } = require('express');
const cors = require('cors');
const baseRateRouter = require('./baseRate');

const router = Router();

router.use(cors());

router.use('/', baseRateRouter);

module.exports = router;
