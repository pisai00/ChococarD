import BackendService from '../src/BackendService';
import BattleScene from '../scenes/BattleScene';
import Phaser from 'phaser';
class GameManager {
    sceneManager: Phaser.Scenes.SceneManager;
    private backendService: BackendService;
    private gameState: { levelid: number; playerMaxHp: number; playerHp: number };
    private deck:Array<number>;
    constructor(sceneManager: Phaser.Scenes.SceneManager) {
        this.sceneManager=sceneManager;
        this.backendService = new BackendService();
        this.gameState = {levelid:1,playerMaxHp:100,playerHp:100};
        this.deck = [1,1,1,2];
    }

    async cards(): Promise<boolean> {
        return await this.backendService.getcards();
    }

    async getlevelbyid(id: number): Promise<boolean> {
        return await this.backendService.getlevelbyid(id);
    }

    startBattle() {
        const battleScene = new BattleScene(this,this.getGameState()); // 將 GameManager 實例傳遞給 BattleScene 的建構子
        this.sceneManager.add('BattleScene', battleScene);
        this.sceneManager.start('BattleScene');
    }
    getGameState(): { levelid: number; playerMaxHp: number; playerHp: number } {
    return this.gameState;
  }
}
export default GameManager;