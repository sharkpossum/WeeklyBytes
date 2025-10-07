import type { ICookingStep } from './cookingStep.ts'
import type { IIngredient } from './ingredient.ts'

export type MealType = "breakfast" | "lunch" | "dinner" | "comfort" | "snack";

export interface IMealIngredient {
    ingredient: IIngredient | string; // Can be an object or an object ID
    quantity: string;
}

export interface IMeal {
    id: string;
    name: string;
    complexity: number;
    mealType: MealType;
    cookingSteps: ICookingStep[];
    ingredients: IMealIngredient[];
}