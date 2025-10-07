import type { Document, Types } from 'mongoose'
import type { IIngredient } from "../../domain/ingredient.js"

import { Schema, model } from 'mongoose';

// Interface omits ID because Mongoose handles ID mapping in the service layer
export interface IngredientDocument extends Omit<IIngredient, "id"> , Document {
    _id: Types.ObjectId;
}

// Defining the mongoose schema
// For ingredients, names are unique
const IngredientSchema = new Schema<IngredientDocument>({
    name: { type: String, required: true, unique: true, trim: true}
})

// Mapping ID, because mongoose stores _id
IngredientSchema.virtual("id").get(function() {
    return this._id.toHexString();
})

// Ensure the virtuals are included in JSON conversions
IngredientSchema.set("toJSON", {virtuals: true});

export const IngredientModel = model<IngredientDocument>("ingredient", IngredientSchema);