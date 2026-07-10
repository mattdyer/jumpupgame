import Phaser from 'phaser';
import { GameScene } from './scenes/GameScene';

console.log('Main.ts: Loading...');

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: [GameScene],
};

console.log('Main.ts: Starting Phaser game...');
new Phaser.Game(config);
