import { GamePlayers } from "@prisma/client";
import { PrismaRepository, db } from "./Repository";


export default class UserRepository extends PrismaRepository<GamePlayers> {
    constructor() {
        super((db.gamePlayers));
    }
}

export { dispose } from "./Repository";

