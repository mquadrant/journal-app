import Journal from '../models/journals';
import { Request, Response, NextFunction } from "express";
import {validateJournal} from '../routes/journal/journalValidation';


export const createJournal = async function (req:Request, res:Response, _next:NextFunction) {
    const {error} = validateJournal(req.body);
    if(error){
    // send a 422 error response if validation fails
      return res.status(422).json({
        status: 'error',
        message: 'Invalid request data',
        data: req.body,
      });
    }else{
        try{
            const journal = await new Journal(req.body).save();
            if(!journal)throw new Error("Try again");
            return res.status(201).json({
                status:'success',
                message:"successfully saved",
                data: journal
            })
        }catch(error){
            throw error;
        }
        

    }
    }

export const getAllUserJournals = async function(req:Request, res:Response, _next:NextFunction) {
    try{
      const journals = await Journal.find({userId:req.params.userId});
      if(!journals)throw new Error("No Journal is found");
      res.status(200).json({
        status: "success",
        results: journals.length,
        data: journals
      })
    }catch(error){
      throw error;
    }
  } ;

export const getSingleUserJournal = async function(req:Request, res:Response, _next:NextFunction) {
    try{
        const journal = await Journal.findById(req.params.journalId);
        if(!journal)throw new Error("Journal does not exist!");
        else if(journal.userId !== req.params.userId)throw new Error("User can't read this journal");
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
    const data = req.body;
    const {error} = validateJournal(data);
    if (error) {
      // send a 422 error response if validation fails
      return res.status(422).json({
        status: 'error',
        message: 'Invalid request data',
        data: data,
      });
    }else{
      try{
          const journalExist = await Journal.findById(req.params.journalId);
          if(!journalExist||journalExist.userId !== req.params.userId)throw new Error("User or Journal does not exist!");
        const journal = await Journal.findByIdAndUpdate(req.params.journalId,data);
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
    try{
        const journal = await Journal.findOne({_id:req.params.journalId});
        if(!journal)throw new Error("Journal doesn't exist!");
        if(journal.userId !== req.params.userId) throw new Error ("Users not authorized to delete this journal");
        await Journal.deleteOne({_id:req.params.journalId});
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