const { Router } = require('express');
const cors = require('cors');
const internationalCodeRouter = require('./internationalCode');

const router = Router();

router.use(cors());

router.use('/', internationalCodeRouter);

module.exports = router;