const { Router } = require('express');
const cors = require('cors');
const stateRouter = require('./state');

const router = Router();

router.use(cors());

router.use('/', stateRouter);

module.exports = router;