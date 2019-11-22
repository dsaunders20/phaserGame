import { Scene } from 'phaser';

class GameScene extends Scene {
    constructor() {
        // because GameScene extends another class we need super()
        super({ key: 'game' })
        
        this.score = 0;
        this.gameOver = false;
        this.lives = 2;
    }
    // =========================================
    // preload
    preload(){
        this.load.image('logo', 'assets/logo.png');
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
        )
    };
    // =============================================
    // create
    create(){
        const sky = this.add.image(400,300,'sky')  
        this.createPlatforms();
        this.createPlayer();
        this.createCursor();
        this.createStars();
        this.createBombs();

        this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, { fontSize: '32px', fill: '#000' });

        this.gameOverText = this.add.text(400, 300, 'GAME OVER \nClick to Restart the Game', {fontWeight: 'bold', fontSize: '40px', backgroundColor: 'red'}).setOrigin(0.5, 0.5);
        this.gameOverText.visible = false;
        this.gameOverText.setInteractive();

        this.livesText = this.add.text(620, 16, `Lives: ${this.lives}`, { fontSize: '32px', fill: '#000' });

        this.livesMessage = this.add.text(400, 300, 'LOST A LIFE.. Click to RESUME', {fontWeight: 'bold', fontSize: '40px', backgroundColor: 'red'}).setOrigin(0.5, 0.5);
        this.livesMessage.visible = false;


    }

    createPlatforms() {
        this.platforms = this.physics.add.staticGroup();
    
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');
    }

    createPlayer() {
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);

        // create the animations by splicing the sprite sheet
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }
    createCursor() {
        this.cursors = this.input.keyboard.createCursorKeys();
        
    }
    createStars() {
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 1,
            setXY: { x: 12, y: 0, stepX: 70 }
            
        });
        
        this.stars.children.iterate((child) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
            child.setCircle(12, 0.5)
        });

        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    }
    collectStar (player, star){
        star.disableBody(true, true);
        this.updateScore();
        if (this.stars.countActive(true) === 0)
        {
            this.stars.children.iterate((child) => {
                child.enableBody(true, child.x, 0, true, true);
    
            });
    
            const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            const bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
    }  
    createBombs() {
        this.bombs = this.physics.add.group({
            // key: 'bomb',
            // repeat: 4,
            // setXY: { x: 7, y: 10, stepX:150 }
        });

        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    }
    hitBomb (player, bomb)  {
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.player.anims.play('turn');
        this.updateLives();
        if (this.lives < 1) {
            this.gameOverFunction(); 
        }
        else {
            this.livesMessage.visible = true;
            this.input.on('pointerup', ()=> {
                this.livesMessage.visible = false;
                this.physics.resume();
                this.player.clearTint();
            });

        }
    }
    gameOverFunction() {
        this.score = 0;
        this.lives = 2;
        this.gameOverText.visible = true; 

        this.gameOverText.on('pointerdown', ()=> {
    
            this.gameOverText.setTint(0xff0000);
    
        });
        this.gameOverText.on('pointerup', ()=> {
    
            this.scene.restart();
        });


    }

    // ================================
    // Update
    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);

           this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

    updateScore() {
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);
    }
    
    updateLives() {
        this.lives--;
        this.livesText.setText(`Lives: ${this.lives}`);
    }
}

export default GameScene;