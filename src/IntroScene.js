import { Scene } from 'phaser' 

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
    }
}

export default IntroScene