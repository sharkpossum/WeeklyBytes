export interface IDataController<T> {
    getName(): string,
    getAll() : Promise<T[]>;
    getById(id: string): Promise<T | null>;
    create(data: Partial<T>) : Promise<T | null>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<T | null>;
}