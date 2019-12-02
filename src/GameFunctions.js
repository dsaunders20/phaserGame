export function updateLives(lives, livesText) {
    lives--;
    livesText.setText(`Lives: ${this.lives}`);
    if (this.lives < 1) {
        this.gameOverFunction(); 
        return
    }
    else {
        this.livesMessage.visible = true;
        this.input.on('pointerup', ()=> {
            this.livesMessage.visible = false;
            this.scene.restart();
            this.player.clearTint();
        });
    }
}

