const { Router } = require('express');
const cors = require('cors');
const notificationRouter = require('./notification');

const router = Router();

router.use(cors());

router.use('/', notificationRouter);

module.exports = router;