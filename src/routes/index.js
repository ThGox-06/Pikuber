const { Router } = require('express');
const cors = require('cors');

const adminRouter = require('./Admin');

const router = Router();

router.use(cors());

router.use('/admin', adminRouter);

module.exports = router;