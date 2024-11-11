import { GamePlayers, Games } from "@prisma/client";
import GamePlayerRepository from "../repositories/GamePlayerRepository";
import GameRepository from "../repositories/GameRepository";


const gameRepository = new GameRepository();
const gamePlayerRepository = new GamePlayerRepository();


export async function getGamesService() {
    return await gameRepository.getAll();
}

export async function getGameByIdService(gameid: number) {
    const game = await gameRepository.findById(gameid);
    if (game === null) {
        return { success: false, message: "Game not found!" }
    }
    return { success: true, message: "Game found successfully!", game };
}

export async function getGameStatsByIdService(gameid: number) {
    const result = await getGameByIdService(gameid);
    if (result.success && result.game !== undefined) {
        return await getGameStats(result.game.ID);
    }
    return null;
}

export async function getCurrentGameService() {
    const gameList = await gameRepository.search({ orderBy: { ID: 'desc' }, take: 1 });
    let game = gameList[0];
    return game;
}

export async function getCurrentGameStatsService() {
    let currentGame = await getCurrentGameService();
    return await getGameStats(currentGame.ID);
}

export async function purchaseSlotService(gameid: number, userid: number, slots: number) {
    const MAXSLOTS = 1000;
    if (slots < 1) {
        return { success: false, message: "A minimum of 1 slot is required to play the game" }
    }
    else if (slots > 1000) {
        return { success: false, message: "Slot amount exceed the maximum limit" }
    }

    let currentGameStats = await getGameStatsByIdService(gameid);



    if (currentGameStats === null) {
        return { success: false, message: "Game not found!" };
    }
    else if (currentGameStats.currentSlotCount === MAXSLOTS) {
        return { success: false, message: "This game is already finished!" };
    }

    let futureSlots = currentGameStats.currentSlotCount + slots;
    let gameFinished = false;

    if (futureSlots >= MAXSLOTS) {
        let excess = futureSlots - MAXSLOTS;
        if (excess !== 0)
            console.log("STEALING!");
        slots -= excess;
        gameFinished = true;
    }

    let gamePlayer: Partial<GamePlayers> = {
        gameID: gameid,
        playerID: userid,
        start: currentGameStats.currentSlotCount + 1,
        slots: slots
    };
    gamePlayerRepository.add(gamePlayer);

    let resultMessage = "Slots purchased successfully! ";


    if (gameFinished) {
        let slotPicked = PickRandomSlot(MAXSLOTS);

        let gamePlayerList = await gamePlayerRepository.search({ where: { gameID: gameid } });

        let playerWinnerID = GetWinnerFromPickedSlot(gamePlayerList, slotPicked);

        let curGame: Partial<Games> = { timeSettled: new Date(), winner: playerWinnerID, slotPicked };
        gameRepository.update(gameid, curGame);

        let newGame: Partial<Games> = { timeCreated: new Date() };
        gameRepository.add(newGame);
        resultMessage += "All slots of the current game is filled, creating a new game.";
    }

    return { success: true, message: resultMessage }
}

function PickRandomSlot(maxSlots: number) {
    let slotPicked = 0;
    while (slotPicked === 0)
        slotPicked = Math.ceil(Math.random() * maxSlots);
    return slotPicked;
}

//O(n) time | O(1) space where n is the total number of Game Players
function GetWinnerFromPickedSlot(gamePlayerList: Array<GamePlayers>, slotPicked: number) {
    // pretend this is binary search instead of iterating all the Game Players XD
    let userIDWinner = 0;
    for (let gamePlayer of gamePlayerList) {
        let range = gamePlayer.start + gamePlayer.slots - 1;
        // if (slotPicked >= gamePlayer.start && slotPicked <= range) {
        if (slotPicked <= range) {
            userIDWinner = gamePlayer.playerID;
            break;
        }
    }
    return userIDWinner;
}

async function getGameStats(gameID: number) {
    let currentGamePlayerList = await gamePlayerRepository.search({ where: { gameID: gameID } });
    const currentSlotCount = currentGamePlayerList.reduce((acc, item) => acc + item.slots, 0);

    let currentHighestSlot = currentGamePlayerList.reduce((acc, item) => Math.max(acc, item.slots), 0);


    let currentDistinctPlayerCount = new Set(currentGamePlayerList.map(gamePlayer => gamePlayer.playerID)).size;
    return { currentSlotCount, currentHighestSlot, currentDistinctPlayerCount };
}