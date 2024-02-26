const { Router } = require('express');
const cors = require('cors');
const loginAccountRouter = require('./loginAccount');

const router = Router();

router.use(cors());

router.use('/', loginAccountRouter);

module.exports = router;
