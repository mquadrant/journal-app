import express from 'express';
import {userSignup, getAllUsers, getSingleUser, updateUser, deleteUser} from '../../controllers/usersController'


const router = express.Router();

/* POST user creating (Sign up). */
router.post('/signup', userSignup);
/* GET users listing. */
router.get('/', getAllUsers);
/* GET single user listing. */
router.get('/:userId', getSingleUser);
/* PATCH user updating. */
router.patch('/:userId', updateUser);
/* DELETE deleting a user by id. */
router.delete('/:userId', deleteUser)

export default router;
