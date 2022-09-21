import express from "express";

import {ListModel} from "../models/List.js";
import verify from "../middleware/verify.js";


const router = express.Router();


router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new ListModel(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});


router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await ListModel.findByIdAndDelete(req.params.id);
      res.status(201).json("The list has been delete...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});



router.get("/", verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await ListModel.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await ListModel.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await ListModel.find();
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});


// router.get("/", async (req,res) => {
//   //   ListModel.remove({}, function(err) {
//   //     if (err) {
//   //         console.log(err)
//   //     } else {
//   //         res.end('success');
//   //     }
//   //   }
//   // );
//   const a = new ListModel({
//     title: "horror movies 4",
//     type: "horror",
//     genre: "populor",
//     content: ["6308499b7d9073e7e4035ccb","6308499b7d9073e7e4035ccb"]
//       })
//     await a.save();
//     res.status(200).json("sus")
// })

export default router;
