import { Users } from "@prisma/client";
import { PrismaRepository, db } from "./Repository";


export default class UserRepository extends PrismaRepository<Users> {
    constructor() {
        super((db.users));
    }
}

export { dispose } from "./Repository";

