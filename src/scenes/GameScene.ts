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

        // Initialize Enemies for testing
        this.enemies.push({ x: 400, y: 300, type: 'patroller', vx: 2, leftBound: 50, rightBound: 750 } as any);
        this.enemies.push({ x: 400, y: 100, type: 'stinger', speed: 1 } as any);

        // Initialize Powerups for testing
        this.powerups.push({ x: 400, y: 200, type: 'spring' } as any);
        this.powerups.push({ x: 200, y: -100, type: 'shield' } as any);
        
        // Input
        this.input.keyboard?.on('pad-SPACE', () => this.player.jump()); // wait I changed it to pad? no
        this.input.keyboard?.on('keydown-SPACE', () => this.player.jump());
        
        // Score text
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', color: '#fff' });
        this.scoreText.setScrollFactor(0);
    }

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
        } else if (this.input.keyboard?.isDown(Phaser.Input.Keyboard.KeyCodes.RIGHT)) {
            dx = 1;
        }

        this.player.update(dt, dx);

        // Update platforms and physics/collisions
        this.updateGame(dt);

        // Render everything
        this.render();

        // Update Score
        this.updateScore();
    }

    private updateGame(dt: number) {
        // Logic for collisions with platforms
        const playerBounds = this.player.getBounds();
        for (const platform of this.platforms) {
            if (checkRectCollision(playerBounds, { x: platform.x, y: platform.y, width: platform.width, height: platform.height })) {
                // If falling and hits platform top
                if (this.player.vy > 0 && this.player.y + this.player.height <= platform.y + platform.height + 5) {
                    this.player.jump();
                }
            }
        }

        // Simple infinite generation: if player is high enough, add more platforms
        if (this.player.y < 300 && this.platforms.length < 20) {
             const lastPlatform = this.platforms[this.platforms.length - 1];
             this.platforms.push({
                 x: Math.random() * 750,
                 y: lastPlatform.y - 100,
                 width: 50 + Math.random() * 50,
                 height: 10
             });
        }

        // Remove old platforms
        this.platforms = this.platforms.filter(p => p.y < this.player.y + 600);
    }

    private updateScore() {
        const currentHeight = Math.abs(Math.floor(this.player.y / 10)); // Simplified height scoring
        if (currentHeight > this.score) {
            this.score = currentHeight;
        }
        this.scoreText.setText(`Score: ${this.score}`);
    }

    private render() {
        this.graphics.clear();
        
        // Draw Platforms
        this.graphics.fillStyle(0x00ff00, 1);
        for (const p of this.platforms) {
            this.graphics.fillRect(p.x, p.y, p.width, p.height);
        }

        // Draw Player
        this.graphics.fillStyle(0xff0000, 1);
        this.graphics.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
    }
}

