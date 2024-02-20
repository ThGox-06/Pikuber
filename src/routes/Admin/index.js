const { Router } = require('express');
const cors = require('cors');
const adminRouter = require('./admin');

const router = Router();

router.use(cors());

router.use('/', adminRouter);

module.exports = router;