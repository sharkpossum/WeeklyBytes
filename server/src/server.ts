import express = require("express");
import type { Request, Response } from 'express';
import mongoose = require('mongoose');

const mealRouter = require('./routes/meals');

const app = express()
let port = process.env.SERVER_PORT || 5000
const mongo_uri : string = process.env.MONGO_URI || ""

app.use('/meals', mealRouter);

app.get('/', (req: Request, res: Response) => {
    res.send("Hello WeeklyBytes!")

    // Connecting to the MongoDB container
    // Placed here for testing...
    mongoose.connect(mongo_uri)
    .then(()=> console.log("Connected!"))
    .catch((err) => console.log(err))
})

app.listen(port, ()=> {
    console.log(`WeeklyBytes Server listening on port ${port}`)
})