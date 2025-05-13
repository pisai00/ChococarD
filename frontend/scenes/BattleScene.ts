import Phaser from 'phaser';
import Player from '../objects/Player';
class BattleScene extends Phaser.Scene {
    public handAreaY = 150;
    player: Player | undefined;
    constructor() {
        super('BattleScene');
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

    create() {
        const gameWidth=this.game.config.width as number;
        const gameHeight=this.game.config.height as number;
        window.addEventListener('resize', () => {
            this.game.scale.resize(window.innerWidth, window.innerHeight);
        });
        this.createBackground(gameWidth,gameHeight);
        this.player=new Player(this, 50, gameHeight - 100, 'player',200,100,100);//未來直接用GameManager處理參數
        
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