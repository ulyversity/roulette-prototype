import { Slots } from "@prisma/client";
import { PrismaRepository, db } from "./Repository";

export default class SlotRepository extends PrismaRepository<Slots> {
    constructor() {
        super((db.slots));
    }
}

export { dispose } from "./Repository";

