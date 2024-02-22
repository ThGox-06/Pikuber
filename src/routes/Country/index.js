const { Router } = require('express');
const cors = require('cors');
const countryRouter = require('./country');

const router = Router();

router.use(cors());

router.use('/', countryRouter);

module.exports = router;