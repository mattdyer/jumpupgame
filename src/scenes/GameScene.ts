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

    }
