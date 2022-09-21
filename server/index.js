import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import mongoose from 'mongoose';
import route from './routers/route.js';
import dotenv from "dotenv"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000
const URI = 'mongodb+srv://thc101001:canguchimnhon8@cluster0.reuomcw.mongodb.net/?retryWrites=true&w=majority'

app.use(bodyParser.json({limit: '30mb'}))
app.use(bodyParser.urlencoded({extended: true, limit : '30mb'}))
app.use('/',cors())
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });
route(app)

mongoose.connect(URI,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('connected');
        app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
    })
    .catch((err) => {
        console.log('err',err);
    })

