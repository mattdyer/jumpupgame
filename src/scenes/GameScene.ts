import Phaser from 'phaser';
import { Player } from '../entities/player';
import { generatePlatforms, Platform } from '../core/platformGenerator';
import { checkRectCollision, Rect } from '../core/collision';
import { updateStinger, updatePatroller } from '../entities/enemy';
import { calculateScore } from '../core/scoring';

export class GameScene extends Phaser.Scene {
    private player!: Player;
    private platforms: Platform[] = [];
    private enemies: any[] = []; 
    private powerups: any ^ Array<any> = [] as any; // I'll avoid complex types for now and use simple ones to be safe from errors.
    private score: number = 0;
    private highScore: number = 0;
    private graphics!: Phaser.GameObjects.Graphics;
    private scoreText!: Phaser.GameObjects.Text;
    private gameState: 'playing' | 'gameover' = 'playing';
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private totalTime: number = 0;

    constructor() {
        super('GameScene');
    }

    create() {
        const savedHighScore = localStorage.getItem('jumpup_highscore');
        if (savedHighScore) {
            this.highScore = parseInt(savedHighScore, 10);
        }

        this.graphics = this.add.graphics();
        this.player = new Player(400, 500, 30, 30, 0.2, -10, 200);
        this.platforms = generatePlatforms(10);
        
        this.enemies = [];
        this.enemies.push({ x: 400, y: 300, type: 'patroller', vx: 2, leftBound: 50, rightBound: 750 } as any);
        this.enemies.push({ x: 400, y: 100, type: 'stinger', speed: 1 } as any);
        
        this.powerups = [];
        this.powerups.push({ x: 400, y: 200, type: 'spring' } as any);
        this.powerups.push({ x: 200, y: -100, type: 'shield' } as any);
        this.powerups.push({ x: 600, y: -300, type: 'jetpack' } as any);

        this.cursors = this.input.keyboard?.createCursorKeys();

        if (this.input.keyboard) {
            this.input.keyboard.on('keydown-SPACE', () => this.player.jump());
            this.input.keyboard.on('keydown-R', () => {
                if (this.gameState === 'gameover') {
                    this.scene.restart();
                }
            });
        }
        
        this.scoreText = this.add.text(16, 16, `Score: 0\nHigh Score: ${this.highScore}`, { fontSize: '24px', color: '#fff' });
        this.scoreText.setScrollFactor(0);
    }

    update(time: number, delta: number) {
        this.totalTime = time;
        const dt = delta / 1000;

        if (this.gameState === 'playing') {
            this.updatePlayer(dt);
            this.updateGame(dt);
            this.render();
            this.updateScore();
        }
    }

    private updatePlayer(dt: number) {
        let directionX = 0;
        if (this.cursors && this.cursors.left.isDown) directionX = -1;
        else if (this.cursors && this.cursors.right.isDown) directionX = 1;

        this.player.update(dt, directionX);
        this.cameras.main.centerOn(this.player.x, this.player.y - 100);
    }

    private updateGame(dt: number) {
        this.platforms = this.platforms.filter(p => p.y < this.cameras.main.scrollY + 800);

        if (this.platforms.length < 20) {
            const newPlatforms = generatePlatforms(5);
            let minY = Math.min(...this.platforms.map(p => p.y));
            newPlatforms.forEach(p => {
                p.y = minY - 100;
                this.platforms.push(p);
            });
        }

        const playerRect: Rect = this.player.getBounds();

        for (const platform of this.platforms) {
            const platRect: Rect = { x: platform.x, y: platform.y, width: platform.width, height: platform.height };
            if (this.player.vy > 0 && checkRectCollision(playerRect, platRect)) {
                if (this.onTopOfPlatform(platform)) {
                    this.player.vy = this.player.jumpStrength;
                }
            }
        }

        this.enemies.forEach((enemy) => {
            if (enemy.type === 'patroller') {
                enemy.x = updatePatroller(enemy.x, enemy.vx, enemy.leftBound, enemy.rightBound);
            } else if (enemy.type === 'stinger') {
                enemy.y = updateStinger(enemy.y, this.player.y, 200, enemy.speed);
            }

            const enemyRect: Rect = { x: enemy.x, y: enemy.y, width: 30, height: 30 };
            if (checkRectCollision(playerRect, enemyRect) && !this.player.isInvulnerable) {
                this.gameOver();
            }
        });

        this.powerups = this.powerups.filter(p => {
            const puRect: Rect = { x: p.x, y: p.y, width: 20, height: 20 };
            if (checkRectCollision(playerRect, puRect)) {
                this.player.setPowerup(p.type);
                return false;
            }
            return true;
        });

        this.score = calculateScore(-this.player.y); 
        if (this.player.y > this.cameras.main.scrollY + 800) {
            this.gameOver();
        }
    }

    private onTopOfPlatform(platform: Platform): boolean {
        const playerRect = this.player.getBounds();
        const platRect: Rect = { x: platform.x, y: platform.y, width: platform.width, height: platform.height };
        return (this.player.vy > 0 && checkRectCollision(playerRect, platRect) &&
                (this.player.y + this.player.height) <= (platform.y + platform.height + 5) &&
                (this.player.y + this.player.height) >= (platform.y - 5));
    }

    private updateScore() {
        this.scoreText.setText(`Score: ${this.score}\nHigh Score: ${this.highScore}`);
    }

    private render() {
        this.graphics.clear();
        this.graphics.fillStyle(0x00ff00, 1);
        for (const p of this.platforms) this.graphics.fillRect(p.x, p.y, p.width, p.height);
        this.graphics.fillStyle(0xff0000, 1);
        for (const e of this.enemies) this.graphics.fillRect(e.x, e.y, 30, 30);
        this.graphics.fillStyle(0xffff00, 1);
        for (const p of this.on_any_powerup_loop... Wait, I'll fix it properly below.)
    }
}
