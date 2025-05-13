import BackendService from '../src/BackendService';
class GameManager {
    private backendService: BackendService;
    private gameState: any;
    private deck:Array<number>;
    constructor() {
        this.backendService = new BackendService();
        this.gameState = {"level":1,'playerMaxHp':100,'playerHp':100};
        this.deck = [1,1,1,2];
    }

    async cards(): Promise<boolean> {
        return await this.backendService.getcards();
    }

    async getlevelbyid(id: number): Promise<boolean> {
        return await this.backendService.getlevelbyid(id);
    }
}
