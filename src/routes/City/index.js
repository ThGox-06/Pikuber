const { Router } = require('express');
const cors = require('cors');
const cityRouter = require('./city');

const router = Router();

router.use(cors());

router.use('/', cityRouter);

module.exports = router;