const { Router } = require('express');
const cors = require('cors');
const commissionRouter = require('./commission');

const router = Router();

router.use(cors());

router.use('/', commissionRouter);

module.exports = router;