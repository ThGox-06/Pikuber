const { Router } = require('express');
const cors = require('cors');
const advertisementRouter = require('./advertisement');

const router = Router();

router.use(cors());

router.use('/', advertisementRouter);

module.exports = router;