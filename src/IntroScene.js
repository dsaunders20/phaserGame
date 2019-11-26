import { Scene } from 'phaser' 
import GameScene1 from './GameScene1';

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
            this.scene.start('level2');
        })
        this.scoreText = this.add.text(16, 16, `score: ${GameScene1.score}`, { fontSize: '32px', fill: '#000' });
    }

}

export default IntroScene