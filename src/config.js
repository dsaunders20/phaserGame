import GameScene1 from './GameScene1'
import Phaser from 'phaser'
import IntroScene from './IntroScene';
import GameScene2 from './GameScene2';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: [IntroScene, GameScene1, GameScene2]
};

export { config }