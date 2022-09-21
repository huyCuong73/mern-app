import express from "express";
const router = express.Router();
import { UserModel } from "../models/User.js";
import Crypt from "crypto-js"
import jwt from "jsonwebtoken"


router.post("/register", async(req,res) => {
    try{    
            const newUser = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: Crypt.AES.encrypt(req.body.password, process.env.KEY),
        })

        const user = await newUser.save();
        res.status(201).json(user);
    }catch(err){
        res.status(500).json(err)
    }
})

router.post("/login", async(req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        !user && res.status(401).json("Wrong input")
        const orgPassword = Crypt.AES.decrypt(user.password, process.env.KEY).toString(Crypt.enc.Utf8)
        
        orgPassword !== req.body.password
        && res.status(401).json("wrong password")

        const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.KEY, {expiresIn : "10d"})

        const {password,...info} = user._doc
        res.status(200).json({ ...info, accessToken})

    } catch (err) {
        res.status(500).json(err)
    }
})

export default router