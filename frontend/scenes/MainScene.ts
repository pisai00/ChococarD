import Phaser from 'phaser';
import GameManager from '../objects/GameManager';

class MainScene extends Phaser.Scene {
    gameManager!: GameManager;
    constructor(){
        super('MainScene');
        
    }

    preload() {
        // ... 加載 MainScene 需要的資源
    }

    create() {
        this.gameManager = new GameManager(this.game.scene);
        this.gameManager.startBattle();
        // ... 其他 MainScene 的初始化
    }

    update(): void {
        // ... MainScene 的遊戲邏輯
    }
}

export default MainScene;