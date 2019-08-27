import express from 'express';
import usersRouter from './user/users';
import authRouter from './auth/auth';
import journalRouter from './journal/journals';
const router = express.Router();

/* GET home page. */
router.get('/', function(_req, res, _next) {
  res.send({message:'Api homepage'})
});

/* USER Auth Routes. */
router.use('/auth', authRouter);

/* USER Routes. */
router.use('/users', usersRouter);

/* JOURNAL Routes. */
router.use('/journals',journalRouter)

export default router;
