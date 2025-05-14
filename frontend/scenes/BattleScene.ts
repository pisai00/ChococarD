import Phaser from 'phaser';
import Player from '../objects/Player';
import GameManager from '../objects/GameManager';
class BattleScene extends Phaser.Scene {
    public handAreaY = 150;
    player: Player | undefined;
    gameManager:GameManager;
    gameState:any;
    level:any;
    backendService: any;
    constructor(gameManager:GameManager,gamestate:any) {
        super('BattleScene');
        this.gameManager=gameManager;
        this.gameState=gamestate;
    }

    preload() {
        this.load.image('background', 'img/gameBackground.png');
        this.load.image('player', 'img/player.png');
        const numberOfCardsToLoad = 2;
        for (let i = 1; i <= numberOfCardsToLoad; i++) {
            const imageKey = `card_${i}`;
            const imagePath = `img/cards/card_${i}.png`;
            this.load.image(imageKey, imagePath);
        }
    }

    async create() {
        this.level = await this.gameManager.getlevelbyid(this.gameState.levelid);
        const gameWidth=this.game.config.width as number;
        const gameHeight=this.game.config.height as number;
        window.addEventListener('resize', () => {
            this.game.scale.resize(window.innerWidth, window.innerHeight);
        });
        this.createBackground(gameWidth,gameHeight);
        this.player=new Player(this, 50, gameHeight - 100, 'player',200,this.gameState.playerMaxHp,this.gameState.playerHp);//未來直接用GameManager處理參數
        
        const big_text = this.add.text(gameWidth/2, gameHeight/2, this.level.name, { fontSize: '72px', color: '#fff' }).setOrigin(0.5).setDepth(100);
        const small_text = this.add.text(gameWidth/2, gameHeight/2+72, '任務目標:'+this.level.description, { fontSize: '36px', color: '#fff' }).setOrigin(0.5).setDepth(100);
        this.time.delayedCall(3000, () => {
            big_text.destroy();
            small_text.destroy();
        });
        
        
    }

    createBackground(gameWidth: number,gameHeight: number){
        const backgroundImage = this.add.image(gameWidth / 2, gameHeight / 2, 'background').setDisplaySize(gameWidth, gameHeight).setOrigin(0.5);
        const scaleX = gameWidth / backgroundImage.width;
        const scaleY = gameHeight / backgroundImage.height;
        const scale = Math.max(scaleX, scaleY);
        backgroundImage.setScale(scale).setScrollFactor(0);
        this.input.on('drag', function (gameObject: { x: any; y: any; }, dragX: any, dragY: any) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
    }

    update() {
    }
}

export default BattleScene;