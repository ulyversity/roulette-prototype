import { Games } from "@prisma/client";
import { PrismaRepository, db } from "./Repository";


export default class UserRepository extends PrismaRepository<Games> {
    constructor() {
        super((db.games));
    }
}

export { dispose } from "./Repository";

