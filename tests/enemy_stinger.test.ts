import { describe, it, expect } from 'vitest';
import { updateStinger } from '../src/entities/enemy';

describe('Enemy - Stinger', () => {
  it('should dive towards the player if in range', () => {
    const playerY = 100;
    const stingerY = 250; // Distance is 150, which is < 200
    const range = 200;
    const speed = 5;

    const newY = updateStinger(stingerY, playerY, range, speed);
    expect(newY).toBeLessThan(stingerY);
  });

  it('should not dive if player is out of range', () => {
    const playerY = 10;
    const stingerY = 300;
    const range = 50; // Very small range
    const speed = 5;

    const newY = updateStinger(stingerY, playerY, range, speed);
    expect(newY).toBe(stingerY);
  });
});
