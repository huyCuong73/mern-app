import express from "express";
const router = express.Router();
import { UserModel } from "../models/User.js";
import Crypt from "crypto-js"
import verify from "../middleware/verify.js"



router.put("/:id", verify, async(req,res) => {
    try {
        if (req.user.id === req.params.id || req.user.isAdmin){
            if(req.body.password){
                req.body.password = Crypt.AES.encrypt(
                    req.user.password, 
                    process.env.KEY
                ).toString(Crypt.enc.Utf8)
            }
            const updatedUser = await UserModel.findByIdAndUpdate(
                {_id: req.params.id},{
                    $set: req.body
                },
                {new: true}
            )
            res.status(200).json(updatedUser)
        }
    } catch (error) {
        res.status(500).json(err)
    }
})

router.delete("/delete/:id", verify, async(req, res) => {

    if (req.user.id === req.params.id || req.user.isAdmin){
        try{
            await UserModel.findByIdAndDelete(req.params.id)
            res.status(200).json("User had been deleted")
        } catch (error) {
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("Not your account")
    }
})

router.get("/find/:id", verify, async(req, res) => {

    try{
        const user = await UserModel.findByIdAndDelete(req.params.id)
        const {password, ... info} = user._doc
        res.status(200).json(info)
    } catch (error) {
        res.status(500).json(err)
    }

})

router.get("/", verify, async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
      try {
        const users = query
          ? await UserModel.find().sort({ _id: -1 }).limit(5)
          : await UserModel.find();
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed to see users!");
    }
  });


export default router