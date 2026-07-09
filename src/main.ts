import Phaser from 'phaser';
import { GameScene } from './scenes/GameScene';

(window as any).gameLoaded = false;
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

// Give it a moment to initialize and then set the flag
setTimeout(() => {
  (window as any).gameLoaded = true;
  console.log('Main.ts: Game Loaded Flag Set');
}, 1000);
