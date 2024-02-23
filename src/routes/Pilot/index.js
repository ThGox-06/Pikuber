const { Router } = require('express');
const cors = require('cors');
const pilotRouter = require('./pilot');
const pilotTransactionHistoryRouter = require('./pilotTransactionHistory');

const router = Router();

router.use(cors());

router.use('/', pilotRouter);
router.use('/pilotTransactionHistory', pilotTransactionHistoryRouter);

module.exports = router;