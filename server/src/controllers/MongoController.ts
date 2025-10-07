import type { IDataController } from "./DataController.js";
import type { Document, Model } from "mongoose";


export class MongoController<T extends Document> implements IDataController<T> {
    constructor(private model: Model<T>) {}

    getName(): string{
        return "mongo"
    }

    async getAll(): Promise<T[]> {
        return await this.model
        .find()
        .lean({virtuals: true}) as T[];
    }

    async getById(id: string): Promise<T | null> {
        return await this.model
        .findById(id)
        .lean({virtuals: true}) as T;
    }

    async create(data: Partial<T>): Promise<T> {
        const doc = await this
        .model
        .create({...data});
        
        return doc.toObject({virtuals: true});
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
        return await this.model
        .findByIdAndUpdate(
            id,
            {...data}, 
            {
                runValidators: true, 
                new:true
            })
            .lean({virtuals: true}) as T || null;
    }

    async delete(id: string): Promise<T | null> {
        return await this.model
        .findByIdAndDelete(id)
        .lean({virtuals: true}) as T || null;
    }
}