import bcrypt from 'bcrypt';
import User from '../models/users';
import { Request, Response, NextFunction } from "express";
import {validateUserEdit,validateSignup} from '../routes/user/userValidation';


export const userSignup = async function (req:Request, res:Response, _next:NextFunction) {
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
    }

 export const getAllUsers = async function(_req:Request, res:Response, _next:NextFunction) {
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
  } 

 export const getSingleUser = async function(req:Request, res:Response, _next:NextFunction) {
    try{
      const user = await User.findById(req.params.userId);
      if(!user)throw new Error("No user found");
      res.status(200).json({
        status: "success",
        data: {
          _id:user._id,
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
  };

export const updateUser = async function(req:Request, res:Response, _next:NextFunction) {
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
        const user = await User.findByIdAndUpdate(req.params.userId,data,{new: true});
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
  }

export const deleteUser = async function(req:Request, res:Response, _next:NextFunction) {
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
    
  }
  