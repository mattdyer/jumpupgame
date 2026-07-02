import { describe, it, expect } from 'vitest';
import { updateHorizontalVelocity } from '../src/core/physics';

describe('Player Horizontal Movement', () => {
  it('should set velocity based on direction and speed', () => {
    const speed = 5;
    const direction = -1; // Left
    const newVelocityX = updateHorizontalVelocity(0, direction, speed);
    expect(newVelocityX).toBe(-5);
  });

  it('should set velocity to zero when there is no input', () => {
    const initialVelocityX = 5;
    const direction = 0; // None
    const speed = 5;
    const newVelocityX = updateHorizontalVelocity(initialVelocityX, direction, speed);
    expect(newVelocityX).toBe(0);
  });

  it('should set velocity to positive when moving right', () => {
    const initialVelocityX = -5;
    const direction = 1; // Right
    const speed = 5;
    const newVelocityX = updateHorizontalVelocity(initialVelocityX, direction, speed);
    expect(newVelocityX).toBe(5);
  });
});
