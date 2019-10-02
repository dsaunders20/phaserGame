import GameScene from './GameScene'
import Phaser from 'phaser'

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: GameScene
};

export { config }