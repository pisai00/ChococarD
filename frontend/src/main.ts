import Phaser from 'phaser';
import BattleScene from '../scenes/BattleScene';

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {  x: 0, y: 0 },
            debug: false
        }
    },
    backgroundColor: '#000000',
    scene: [BattleScene]
};

new Phaser.Game(config);