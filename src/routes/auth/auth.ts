import express from 'express';
import bcrypt from 'bcrypt';
import User from './../../models/users';
import jwt from 'jsonwebtoken';
import env from "./../../config";

const router = express.Router();


/* POST user Logging in (Logging In). */
router.post('/login', async function(req, res, _next) {
  try{
    const user = await User.findOne({email:req.body.email});
    if (!user) throw new Error("Login Failed");
      const isEqual = await bcrypt.compare(req.body.password, user.password);
      if (!isEqual) throw new Error("Login Failed");
      const token = jwt.sign(
          { userId: user.id, email: user.email },
          env.jwtSecret!,
          {
              expiresIn: "1h",
          }
      );
      return res.status(200).json({
        message:"successfully logged In",
        userId: user.id,
        token: token,
        tokenExpiration: 1,
      })
  }catch(error){
    throw error;
  }
});