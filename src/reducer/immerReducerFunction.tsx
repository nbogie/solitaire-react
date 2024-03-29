import { GameState } from "../gameCore/gameState";
import { Action } from "./action";
import { doDrawCard } from "./doDrawCard";
import { doMoveCards } from "./doMoveCards";
import { doMoveCardsToEmptyColumn } from "./doMoveCardsToEmptyColumn";
import { doMoveCardToHomePile } from "./doMoveCardToHomePile";
import { doRevealCard } from "./doRevealCard";

export function immerReducerFunction(gs: GameState, action: Action) {
    switch (action.name) {
        case "move-cards":
            doMoveCards(gs, action);
            return;
        case "move-cards-to-empty-column":
            doMoveCardsToEmptyColumn(gs, action);
            return;
        case "move-card-to-home-pile":
            doMoveCardToHomePile(gs, action);
            return;
        case "reveal-card":
            doRevealCard(gs, action);
            return;
        case "draw-card":
            doDrawCard(gs, action);
            return;
        case "reset-game":
            throw new Error("not implemented: reset-game");

        default:
            throw new UnreachableCodeError(
                action,
                "Unexpected action: " + JSON.stringify(action)
            );
    }
}

class UnreachableCodeError extends Error {
    constructor(myNever: never, message: string) {
        super(message);
    }
}
