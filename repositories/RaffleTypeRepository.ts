import { RaffleTypes } from "@prisma/client";
import { PrismaRepository, db } from "./Repository";


export default class UserRepository extends PrismaRepository<RaffleTypes> {
    constructor() {
        super((db.raffleTypes));
    }
}

export { dispose } from "./Repository";

