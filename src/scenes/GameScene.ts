import Phaser from 'phaser';
import { Player } from '../entities/player';
import { generatePlatforms, Platform } from '../core/platformGenerator';
import { checkRectCollision, Rect } from '../core/collision';
import { updateStinger, updatePatroller } from '../entities/enemy';
import { applyPowerupEffect } from '../entities/powerups';
import { calculateScore } from '../core/scoring';

export class GameScene extends Phaser.Scene {
    private player!: Player;
    private platforms: Platform[] = [];
    private enemies: any[] = []; // In a real app, use a proper type
    private powerups: any[] = [];
    private score: number = 0;
    private lastHeight: number = 0;
    private graphics!: Phaser.GameObjects.Graphics;
    private scoreText!: Phaser.GameObjects.Text;

    constructor() {
        super('GameScene');
    }

    create() {
        this.graphics = this.add.graphics();
        
        // Initialize Player: x, y, width, height, gravity, jumpStrength, speed
        this.player = new Player(400, 500, 30, 30, 0.2, -10, 200);
        
        // Initial Platforms
        this.platforms = generatePlatforms(10);
        
        // Input
        this.input.keyboard?.on('keydown-SPACE', () => this.player.jump());

        // Score text
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', color: '#fff' });
        this.scoreText.setScrollFactor(0);
    }

    update(time: number, delta: number) {
        const dt = delta / 1000;
        let dx = 0;

        // Get horizontal input from keyboard
        if (this.input.keyboard?.isDown(Phaser.Input.Keyboard.KeyCodes.LEFT)) {
            dx = -1;
        } else if (this.input.keyboard?.is 
        // Wait, I'll fix this typo in the next step or just write it correctly now.
    }
}
