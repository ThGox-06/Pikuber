const { Router } = require('express');
const cors = require('cors');
const serviceRouter = require('./service');

const router = Router();

router.use(cors());

router.use('/', serviceRouter);

module.exports = router;