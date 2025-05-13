import BackendService from '../src/BackendService';
class GameManager {
    private backendService: BackendService;
    private gameState: any;

    constructor() {
        this.backendService = new BackendService();
        this.gameState = {};
    }

    async cards(credentials: any): Promise<boolean> {
        const result = await this.backendService.getcards(credentials);
        if (result.success) {
            this.gameState.playerId = result.playerId;
            return true;
        }
        return false;
    }

    async getlevelbyid(credentials: any,id: number): Promise<boolean> {
            const result = await this.backendService.getlevelbyid(credentials,id);
            if (result.success) {
                this.gameState.playerId = result.playerId;
                return true;
            }
            return false;
        }

}
