import { Scene } from 'phaser' 
import GameScene1 from './GameScene1';
import { score } from '.';

class IntroScene extends Scene {
    constructor() {
        super({key: 'intro'})
        console.log(score)
    }
    preload() {
        this.load.image('logo', 'assets/logo.png')
    }

    create() {
        const logo = this.add.image(400, 300, 'logo').setOrigin(0.5);
        this.input.on('pointerdown', () => {
            this.scene.start('level1');
        })
        this.scoreText = this.add.text(16, 16, `score: ${score}`, { fontSize: '32px', fill: '#888' });
    }
}
export default IntroScene