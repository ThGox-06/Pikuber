const { Router } = require('express');
const cors = require('cors');
const userRouter = require('./user');

const router = Router();

router.use(cors());

router.use('/', userRouter);

module.exports = router;