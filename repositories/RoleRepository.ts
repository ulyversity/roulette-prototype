import { Roles } from "@prisma/client";
import { PrismaRepository, db } from "./Repository";


export default class UserRepository extends PrismaRepository<Roles> {
    constructor() {
        super((db.roles));
    }
}

export { dispose } from "./Repository";

