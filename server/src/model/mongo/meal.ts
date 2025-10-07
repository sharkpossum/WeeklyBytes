import type { Document, Types } from 'mongoose'
import type { IMeal, IMealIngredient } from "../../domain/meal.js"

import { IngredientModel } from './ingredient.js';
import { CookingStepModel } from './cookingSteps.js';

import { Schema, model } from 'mongoose';

// Interface omits ID because Mongoose handles ID mapping in the service layer
export interface MealDocument extends Omit<IMeal, "id">, Document {
    _id: Types.ObjectId;
}

export interface MealIngredientDocument extends IMealIngredient, Document {

}

const MealIngredientSchema = new Schema<MealIngredientDocument>({
    ingredient: {type: Schema.Types.ObjectId, ref: "ingredient", required: false},
    quantity: {type: String, required: false}
})

// Defining the mongoose schema
const MealSchema = new Schema<MealDocument>({
    name: { type : String, required : true, trim: true},
    complexity: { type: Number, required: true, min: 1, max: 5}, // Complexity of dishes ranked 1 through 5
    mealType: {
        type: String,
        enum: ["breakfast", "lunch", "dinner", "comfort", "snack"],
        required: true,
    },
    cookingSteps: [{type: Schema.Types.ObjectId, ref: "cookingstep", required: false}],
    ingredients: {type: [MealIngredientSchema], required: false}
})

// Mapping ID, because mongoose stores _id
MealSchema.virtual("id").get(function() {
    return this._id.toHexString();
})

// Ensure the virtuals are included in JSON conversions
MealSchema.set("toJSON", {virtuals: true});

export const MealModel = model<MealDocument>("meal", MealSchema);