import Journal from '../models/journals';
import { Request, Response, NextFunction } from "express";
import {validateJournal} from '../routes/journal/journalValidation';


export const createJournal = async function (req:Request, res:Response, _next:NextFunction) {
  const {userId} = req.body.userData
  let clone = Object.assign({}, req.body);
    delete clone.userData;
    const {error} = validateJournal(clone);
    if(error){
    // send a 422 error response if validation fails
      return res.status(422).json({
        status: 'error',
        message: 'Invalid request data',
        data: clone
      });
    }else{
        try{
            const journal = await new Journal({
              ...req.body,
              userId: userId
            }).save();
              return res.status(201).json({
                status:'success',
                message:"successfully saved",
                data: journal
            })
        }catch(error){
          return res.status(500).json({
            status:"fail",
            error: "Something went wrong"
          })
        }
        

    }
    }

export const getAllUserJournals = async function(req:Request, res:Response, _next:NextFunction) {
    const {userId} = req.body.userData;
    try{
      const journals = await Journal.find({userId:userId});
      if(!journals){
        return res.status(404).json({
          status:"fail",
          message: "No Journal found"
        });
      }
      return res.status(200).json({
        status: "success",
        results: journals.length,
        data: journals
      })
    }catch(error){
      return res.status(404).json({
        status:"fail",
        message: error
      });
    }
  } ;

export const getSingleUserJournal = async function(req:Request, res:Response, _next:NextFunction) {
  const {userId} = req.body.userData
    try{
        const journal = await Journal.findById(req.params.journalId);
        if(!journal){
          return res.status(404).json({
            status:"fail",
            message: "Journal does not exist"
          });
        }
        else if(journal.userId.toString() !== userId){
          return res.status(401).json({
            status:"fail",
            message: "Can not view this journal"
          });
        }
      else return res.status(200).json({
        status: "success",
        data: journal
      });
    }catch(error){
      return res.status(404).json({
        status:"fail",
        message: error
      });
    }
  };

export const updateJournal = async function(req:Request, res:Response, _next:NextFunction) {
  const {userId} = req.body.userData
  let clone = Object.assign({}, req.body);
    delete clone.userData;
    const {error} = validateJournal(clone);
    if (error) {
      // send a 422 error response if validation fails
      return res.status(422).json({
        status: 'error',
        message: 'Invalid request data',
        data: clone,
      });
    }else{
      try{
          const journalExist = await Journal.findById(req.params.journalId);
          if(!journalExist){
            return res.status(401).json({
              status:"fail",
              message: "Journal doesn't exist!"
            });
          }
          if(journalExist.userId.toString() !== userId){
            return res.status(401).json({
              status:"fail",
              message: "User not authorized to update this journal"
            });
          }
        const journal = await Journal.findByIdAndUpdate(req.params.journalId,clone,{new: true});
        return res.status(201).json({
          status: "success",
          data: journal
        })
      }catch(error){
        return res.status(404).json({
          status:"fail",
          message: error
        });
      }
    }
  };

export const deleteJournal = async function(req:Request, res:Response, _next:NextFunction) {
  const {userId} = req.body.userData
    try{
        const journal = await Journal.findOne({_id:req.params.journalId});
        if(!journal){
          return res.status(401).json({
            status:"fail",
            message: "Journal doesn't exist!"
          });
        }
        if(journal.userId.toString() !== userId) {
          return res.status(401).json({
            status:"fail",
            message: "User not authorized to delete this journal"
          });
        }
        await Journal.deleteOne({_id:req.params.journalId});
        return res.status(204).json({
        status: "success"
      })
    }catch(error){
      return res.status(404).json({
        status:"fail",
        message: error
      });
    }
    
  }