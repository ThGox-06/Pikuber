const { Router } = require('express');
const cors = require('cors');
const logoutAccountRouter = require('./logoutAccount');

const router = Router();

router.use(cors());

router.use('/', logoutAccountRouter);

module.exports = router;
