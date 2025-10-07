import type { Document, Types } from 'mongoose'
import type { ICookingStep } from "../../domain/cookingStep.js"

import { Schema, model } from 'mongoose';

export interface CookingStepDocument extends ICookingStep, Document {
    _id: Types.ObjectId;
}

// Defining the mongoose schema
const CookingStepSchema = new Schema<CookingStepDocument>({
    title: { type: String, required: true, trim: true },
    description: {type: String, required: false, trim: true }
})

// Mapping ID, because mongoose stores _id
CookingStepSchema.virtual("id").get(function() {
    return this._id.toHexString();
})

// Ensure the virtuals are included in JSON conversions
CookingStepSchema.set("toJSON", {virtuals: true});

export const CookingStepModel = model<CookingStepDocument>("cookingstep", CookingStepSchema);