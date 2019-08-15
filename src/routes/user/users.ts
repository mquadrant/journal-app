import express from 'express';
import bcrypt from 'bcrypt';
import User from './../../models/users';
import {validateUserEdit,validateSignup} from './userValidation';

const router = express.Router();

/* POST user creating (Sign up). */
router.post('/signup', async function(req, res, _next) {
const {error} = validateSignup(req.body);
if(error){
// send a 422 error response if validation fails
  return res.status(422).json({
    status: 'error',
    message: 'Invalid request data',
    data: req.body,
  });
}else{
  try{
    const isEmailExist = await User.findOne({email:req.body.email});
    if(isEmailExist){
     return res.status(409).json({
        status:"fail",
        message: "Email already exist!"
      })
    }else{
      const hashedPassword = await bcrypt.hash(req.body.password,10)
      try{
        const user = await new User({
          ...req.body,
          password: hashedPassword
        }).save();
        return res.status(201).json({
          status:"success",
          message: "created successfully",
          data: {
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            password:null,
          }
        })
      }catch(error){
        return res.status(500).json({
          status:"fail",
          error: error
        })
      }
    }
  }catch(error){
    return res.status(500).json({
      status:"fail",
      error: error
})
  }
}
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
router.get('/:userId', async function(req, res, _next) {
  try{
    const user = await User.findById(req.params.userId);
    if(!user)throw new Error("No user found");
    res.status(200).json({
      status: "success",
      data: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
      }
    })
  }catch(error){
    res.status(404).json({
      status:"fail",
      message: error
    });
  }
  
});
/* PATCH user updating. */
router.patch('/:userId', async function(req, res, _next) {
  const data = req.body;
  const {error} = validateUserEdit(data);
  if (error) {
    // send a 422 error response if validation fails
    return res.status(422).json({
      status: 'error',
      message: 'Invalid request data',
      data: data,
    });
  }else{
    try{
      const user = await User.findByIdAndUpdate(req.params.userId,data);
      if(!user)throw new Error("User does not exist!");
      return res.status(201).json({
        status: "success",
        data: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }
      })
    }catch(error){
      return res.status(404).json({
        status:"fail",
        message: error
      });
    }
  }

});
/* DELETE deleting a user by id. */
router.delete('/:userId', async function(req, res, _next) {
  try{
    const user = await User.deleteOne({_id:req.params.userId});
    if(!user)throw new Error("User doesn't exist!")
    res.status(204).json({
      status: "success"
    })
  }catch(error){
    res.status(404).json({
      status:"fail",
      message: error
    });
  }
  
});

export default router;
