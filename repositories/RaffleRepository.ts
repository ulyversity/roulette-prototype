import { Raffles } from "@prisma/client";
import { PrismaRepository, db } from "./Repository";


export default class UserRepository extends PrismaRepository<Raffles> {
    constructor() {
        super((db.raffles));
    }
}

export { dispose } from "./Repository";

