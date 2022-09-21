import express, { request } from "express";

import {MovieModel} from "../models/Movie.js";
import verify from "../middleware/verify.js";

const router = express.Router();

router.post("/:id/reviews", verify, async(req,res) => {

  const movie = await MovieModel.findById(req.params.id)
  if(movie){

    if(req.body.rating){
      try{
        const alreadyRated = movie.rating.find(
          (r) => r.userId.toString() === req.user.id.toString()
        )
        if (alreadyRated) {
          const lastRating = movie.rating.find((r) => r.userId.toString() === req.user.id.toString())
          const last = lastRating.rating
          movie.ratingStat[lastRating.rating]--;
          lastRating.rating = req.body.rating
          movie.ratingStat[req.body.rating]++;
          const avg = movie.avgRating
          
          movie.avgRating = avg + (req.body.rating-last)/movie.numRatings
          movie.save()
          res.status(200).json({avgRating:movie.avgRating, ratingStat:movie.ratingStat,rating: req.body.rating })
        }else{ 
          const rating = {
            rating: req.body.rating,
            userId: req.user.id,
          }          
          movie.rating.push(rating)

          movie.ratingStat[0] ++;

          movie.numRatings= movie.ratingStat[0]

          switch(JSON.parse(req.body.rating)) {
            case 1:
              movie.ratingStat[1] ++;
              break;
            case 2:
              movie.ratingStat[2] ++;
              break;
            case 3:
              movie.ratingStat[3] ++;
              break; 
            case 4:
              movie.ratingStat[4] ++;
              break;  
            case 5:
              movie.ratingStat[5] ++;
              break;                
            case 6:
              movie.ratingStat[6] ++;
              break; 
            case 7:
              movie.ratingStat[7] ++;
              break;
            case 8:
              movie.ratingStat[8] ++;
              break;  
            case 9:
              movie.ratingStat[9] ++;
              break;
            case 10:
              movie.ratingStat[10] ++;
              break;        
            }

          const totalRating = movie.rating.length;
          movie.avgRating =
          movie.rating.reduce((acc, item) => item.rating + acc, 0) /
          totalRating;

          await movie.save();
          
          res.status(201).json({avgRating:movie.avgRating, ratingStat:movie.ratingStat,rating: req.body.rating }) ;
          }
      }catch(err){
        res.status(500).json(err)
      }
    }
    if(req.body.comment){
      try{

          const comment = {
            username : req.body.username,
            headline : req.body.headline,
            comment: req.body.comment,
            userId: req.user.id,
          }
          console.log(comment);
          movie.comment.unshift(comment)
          movie.numReviews ++
          await movie.save()
          res.status(201).json({ message: 'Review added' }) 
        
      }catch(err){
        res.status(500).json(err)
      }
    }
  }else{
    res.status(404).json("Movie not found")
  }    
})




router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new MovieModel(req.body);
    newMovie.ratingStat = [0,0,0,0,0,0,0,0,0,0,0]
    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not admin!");
  }
});






router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await MovieModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedMovie);
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
      await MovieModel.findByIdAndDelete(req.params.id);
      res.status(200).json("The movie has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});



router.get("/popular", verify, async (req, res) => {

  let list = [];
  try {

      list = await MovieModel.aggregate([
        { $sort: { numRatings: -1 } },
      ])
    
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/upcoming", verify, async (req, res) => {
  const typeQuery = req.query.type;
  let list = [];
  try {
  
    if (typeQuery) {
      list = await MovieModel.aggregate([
        { $match: { type: typeQuery, upcoming: true } },
        { $sample: { size: 4 } }
      ])
    } else {
      list = await MovieModel.aggregate([
        { $match: { upcoming: true } },
        { $sample: { size: 4 } }
      ])
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find", verify, async (req, res) => {
  const text = req.query.text;

  try {
    console.log("Partial Search Begins");
    const docs = await MovieModel.find({ title: { $regex: text, $options: "i" } })
      
    res.status(200).json(docs);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id/reviews/comments",verify, async (req, res) => {
  const items = 2;
  const page = req.query.page || 1;

  try {
    const skip = (page - 1) * items

    const movie = await MovieModel.findById(req.params.id);

    const count = movie.comment.length

    const pageCount = Math.ceil(count / items)

    const comments = movie.comment.slice(skip, skip + 2)
    res.status(200).json({comments:[...comments], pageCount: pageCount})
  } catch (err) {
    res.status(500).json(err)
  } 
})

router.get("/:id/castlist", verify, async (req, res) => {
  try {
    const movie = await MovieModel.findById(req.params.id);

    res.status(200).json(movie.castList);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get("/:id", verify, async (req, res) => {
  try {
    const movie = await MovieModel.findById(req.params.id);
    const {comment, ...movieFeature} = movie._doc
    res.status(200).json(movieFeature);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
      movie = await Movie.aggregate([
        { $match: { type: type } },
        { $sample: { size: 1 } },
      ]);

    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get("/", verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        if (genreQuery == "all"){
          list = await MovieModel.aggregate([
            { $match: { type: typeQuery} }
          ])
        }else{
          list = await MovieModel.aggregate([
            { $match: { type: typeQuery, genre: genreQuery } },
          ]);
        }
      } else {
        list = await MovieModel.aggregate([
          { $match: { type: typeQuery} },
        ]);
      }
    } else {
      list = await MovieModel.find();
    }
    const reversedList = list.map(list.pop,[...list]); 

    res.status(200).json(reversedList);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
