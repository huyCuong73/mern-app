import express from "express";

import {PersonModel} from "../models/Person.js";
import verify from "../middleware/verify.js";

const router = express.Router();

router.post("/",verify, async (req,res) =>{
    if (req.user.isAdmin) {
        const newPerson = new PersonModel(req.body);
        try {
          const savedPerson= await newPerson.save();
          res.status(201).json(savedPerson);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("You are not admin!");
      }
})


export default router;