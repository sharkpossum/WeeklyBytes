import { controllerManger } from "./ControllerManager.js";
import { MongoController } from "./MongoController.js";

import { MealModel, type MealDocument } from "../model/mongo/meal.js";
import { IngredientModel, type IngredientDocument } from "../model/mongo/ingredient.js";
import { CookingStepModel, type CookingStepDocument } from "../model/mongo/cookingSteps.js";

export function initControllers(){
    // Meals
    const mongoMealController = new MongoController<MealDocument>(MealModel);
    controllerManger.registerController(
        mongoMealController.getName(),
        "meals",
        mongoMealController
    )
    
    // Ingredients
    const mongoIngredientController = new MongoController<IngredientDocument>(IngredientModel);
    controllerManger.registerController(
        mongoIngredientController.getName(),
        "ingredients",
        mongoIngredientController
    )
    
    // Cookingsteps
    const mongoCookingstepController = new MongoController<CookingStepDocument>(CookingStepModel);
    controllerManger.registerController(
        mongoCookingstepController.getName(),
        "cookingsteps",
        mongoCookingstepController
    )
}