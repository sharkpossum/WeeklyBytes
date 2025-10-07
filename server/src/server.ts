import express from "express";
import mongoose from "mongoose";
import type { Request, Response } from 'express';

// Routers
import mealRouter from "./routes/meals.js"
import ingredientRouter from "./routes/ingredients.js"
import cookingStepRouter from "./routes/cookingsteps.js"

// Controllers
import { initControllers } from "./controllers/InitControllers.js";
import { controllerManger } from "./controllers/ControllerManager.js";

// Config
const port = process.env.SERVER_PORT || 5000;
const mongo_uri : string = process.env.MONGO_URI || ""
const default_data_source = "mongo"

const app = express()

// Using JSON for request bodies
app.use(express.json());


// Routes
app.use('/meals', mealRouter);
app.use('/ingredients', ingredientRouter)
app.use('/cookingsteps', cookingStepRouter)


// Hello World!
app.get('/', (req: Request, res: Response) => {
    res.send("Hello WeeklyBytes!")
})

function init() {

    // Initializing and registering data controllers.
    initControllers();
    controllerManger.setDefaultSource(default_data_source);

    // Connecting to the MongoDB using Mongoose, URI provided by container.
    mongoose.connect(mongo_uri)
    .then(()=> console.log("Connected to MongoDB!"))
    .catch((err) => console.log(err))
}

app.listen(port, ()=> {
    init();
    console.log(`WeeklyBytes Server listening on port ${port}`)
})