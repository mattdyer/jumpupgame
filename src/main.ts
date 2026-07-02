import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        // No assets yet
    }

    create() {
        this.add.text(100, 100, 'JumpUp Loading...', { fontSize: '32px', color: '#fff' });
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: [GameScene],
};

new Phaser.Game(config);
