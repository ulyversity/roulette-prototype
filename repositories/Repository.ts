// PrismaRepository.ts
import { PrismaClient } from '@prisma/client';
import { IRepository } from '../interfaces/IRepository';

export const db = new PrismaClient();

export const dispose = () => {
    // console.log(`Diposing Connection ${db}`);
    db.$disconnect()/*.then(() => {
        console.log(`After dispose ${db}`);
    });*/
}

export class PrismaRepository<T> implements IRepository<T> {
    private model: any;

    constructor(model: any) {
        this.model = model;
    }

    async findById(id: number): Promise<T | null> {
        return await this.model.findUnique({
            where: { ID: id },
        });
    }

    async getAll(): Promise<T[]> {
        return await this.model.findMany();
    }

    async search(options: object = {}): Promise<T[]> {
        return await this.model.findMany(options);
    }

    async add(data: Partial<T>): Promise<T> {
        return await this.model.create({
            data,
        });
    }

    async update(id: number, data: Partial<T>): Promise<T | null> {
        return await this.model.update({
            where: { ID: id },
            data,
        });
    }

    async delete(id: number): Promise<T | null> {
        return await this.model.delete({
            where: { ID: id },
        });
    }

}