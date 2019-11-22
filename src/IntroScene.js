import { Scene } from 'phaser' 
import GameScene from './GameScene';

class IntroScene extends Scene {
    constructor() {
        super({key: 'intro'})
    }
    preload() {
        this.load.image('logo', 'assets/logo.png')
    }

    create() {
        const logo = this.add.image(400, 300, 'logo').setOrigin(0.5);
        this.input.on('pointerdown', () => {
            this.scene.start('game');
        })
        this.scoreText = this.add.text(16, 16, `score: ${GameScene.score}`, { fontSize: '32px', fill: '#000' });
    }

}

export default IntroScene