import Phaser from 'phaser';
import MainScene from '../scenes/MainScene';
import LoginScene from '../scenes/LoginScene.ts';
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container', 
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {  x: 0, y: 0 },
            debug: false
        }
    },
    backgroundColor: '#000000',
    scene: [LoginScene,MainScene],
    dom: {
        createContainer: true
    },
};

const game = new Phaser.Game(config);
