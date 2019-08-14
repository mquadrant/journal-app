import express from 'express';
import User from './../../models/users'

const router = express.Router();

/* POST user creating (Sign up). */
router.post('/signup', function(_req, res, _next) {
  res.send('respond with a resource');
});
/* POST user Logging in (Logging In). */
router.post('/login', function(_req, res, _next) {
  res.send('respond with a resource');
});
/* GET users listing. */
router.get('/', async function(_req, res, _next) {
  try{
    const users = await User.find();
    if(!users)throw new Error("No user is found");
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
          users,
      }
    })
  }catch(error){
    res.status(404).json({
      status:"fail",
      message: error
    })
  }
});
/* GET single user listing. */
router.get('/:userId', function(_req, res, _next) {
  res.send('respond with a resource');
});
/* PATCH user updating. */
router.patch('/:userId', function(_req, res, _next) {
  res.send('respond with a resource');
});
/* GET users listing. */
router.delete('/:userId', function(_req, res, _next) {
  res.send('respond with a resource');
});

export default router;
