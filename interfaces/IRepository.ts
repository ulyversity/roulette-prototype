export interface IRepository<T> {
    findById(id: number): Promise<T | null>;
    getAll(): Promise<T[]>;
    search(options: object): Promise<T[]>;
    add(data: Partial<T>): Promise<T>;
    update(id: number, data: Partial<T>): Promise<T | null>;
    delete(id: number): Promise<T | null>;
}