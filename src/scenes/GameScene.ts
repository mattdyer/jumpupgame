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
    private enemies: any[] = []; 
    private powerups: any[] = [];
    private score: number = 0;
    private graphics!: Phaser.GameObjects.Graphics;
    private scoreText!: Phaser.GameObjects.Text;
    private gameState: 'playing' | 'gameover' = 'playing';

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
        this.input.keyboard?.on('keydown-SPACE', () => this.player.jump());
        
        // Score text
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', color: '#fff' });
        this.scoreText.setScrollFactor(0);
    }

    update(time: number, delta: number) {
        const dt = delta / 1000;

        if (this.gameState === 'playing') {
            this.updatePlayer(dt);
            this.updateGame(dt);
            this.render();
            this.updateScore();
        }
    }

    private updatePlayer(dt: number) {
        // Placeholder for horizontal movement direction (could be linked to keys later)
        const directionX = 0; 
        this.player.update(dt, direction<0xA0>directionX);

        // Camera follows player upward
        this.cameras.main.centerOn(this.player.x, this.player.y - 100);
    }

    private updateGame(dt: number) {
        // 1. Platform Management & Collision
        // Remove platforms that are far below the camera view
        this.platforms = this.platforms.filter(p => p.y < this.cameras.main.scrollY + 800);

        // Generate new platforms as we go up
        if (this.platforms.length < 20) {
            const newPlatforms = generatePlatforms(5);
            // Find the highest platform currently in the array to offset new ones
            let minY = Math.min(...this.platforms.map(p => p.y));
            newPlatforms.forEach(p => {
                p.y = minY - 100; // Ensure they appear above current platforms
                this.platforms.push(p);
            });
        }

        const playerRect: Rect = this.player.getBounds();

        for (const platform of this.platforms) {
            const platRect: Rect = { x: platform.x, y: platform.y, width: platform.width, height: platform.height };
            // Check if player is falling and hits the top of a platform
            if (this.player.vy > 0 && 
                checkRectCollision(playerRect, platRect) &&
                (this.player.y + this.player.height) <= (platform.y + platform.height + 5) &&
                (this.player.y + this.player.height) >= (platform.y - 5)) {
                this.player.vy = this.player.jumpStrength; // Bounce/Jump on landing
            }
        }

        // 2. Enemy Update & Collision
        this.enemies.forEach((enemy) => {
            if (enemy.type === 'patroller') {
                enemy.x = updatePatroller(enemy.x, enemy.vx, enemy.leftBound, enemy.rightBound);
            } else if (enemy.type === 'stinger') {
                enemy.y = updateStinger(enemy.y, this.player.y, 200, enemy.speed);
            }

            const enemyRect: Rect = { x: enemy.x, y: enemy.y, width: 30, height: 30 };
            if (checkRectCollision(playerRect, enemyRect)) {
                if (!this.player.isInvulnerable) {
                    this.gameOver();
                }
            }
        });

        // 3. Powerup Update & Collision
        this.powerups = this.powerups.filter(p => {
            const puRect: Rect = { x: p.x, y: p.y, width: 20, height: 20 };
            if (checkRectCollision(playerRect, puRect)) {
                this.player.setPowerup(p.type);
                return false; // Remove powerup after use
            }
            return true;
        });

        // 4. Scoring & Death condition
        this.score = calculateScore(-this.player.y); 
        if (this.player.y > this.cameras.main.scrollY + 800) {
            this.gameOver();
        }
    }

    private updateScore() {
        this.scoreText.setText(`Score: ${this.score}`);
    }

    private render() {
        this.graphics.clear();

        // Draw Platforms
        this.graphics.fillStyle(0x00ff00, 1);
        for (const p of this.platforms) {
            this.graphics.fillRect(p.x, p.y, p.width, p.height);
        }

        // Draw Enemies
        this.graphics.fillStyle(0xff0000, 1);
        for (const e of this.enemies) {
            this.graphics.fillRect(e.x, e.y, 30, 30);
        }

        // Draw Powerups
        this.graphics.fillStyle(0xffff00, 1);
        for (const p of this.powerups) {
            this.graphics.fillRect(p.pers_x || p.x, p.pers_y || p.y, 20, 20); // use fallback for safety if needed but x/y should exist
        }

        // Draw Player
        this.graphics.fillStyle(0x0000ff, 1);
        this.graphics.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
    }

    private gameOver() {
        this.gameState = 'gameover';
        this.scoreText.setText(`GAME OVER! Final Score: ${this.score}`);
        this.scoreText.setAlignment('center');
    }
}
