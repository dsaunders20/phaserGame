import GameScene from './GameScene'
import Phaser from 'phaser'
import IntroScene from './IntroScene';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [IntroScene, GameScene]
};

export { config }