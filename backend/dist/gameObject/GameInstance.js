"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameInstance {
    constructor(gameId, gameState, currentState, createdAt, lastActivityAt) {
        this.gameId = gameId;
        this.gameState = gameState;
        this.currentState = currentState;
        this.createdAt = createdAt;
        this.lastActivityAt = lastActivityAt;
    }
    updateGameState(newGameState) {
        this.gameState = newGameState;
        this.updateLastActivityAt();
    }
    updateCurrentState(newCurrentState) {
        this.currentState = newCurrentState;
        this.updateLastActivityAt();
    }
    updateLastActivityAt() {
        this.lastActivityAt = Date.now();
    }
    getData() {
        return {
            gameId: this.gameId,
            gameState: this.gameState,
            currentState: this.currentState,
            createdAt: this.createdAt,
            lastActivityAt: this.lastActivityAt,
        };
    }
}
exports.default = GameInstance;
//# sourceMappingURL=GameInstance.js.map