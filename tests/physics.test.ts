import { describe, it, expect } from 'vitest';
import { applyGravity, updatePosition } from '../src/core/physics';

describe('Physics Engine', () => {
  it('should apply gravity to velocity', () => {
    const velocity = 0;
    const gravity = 0.5;
    const newVelocity = applyGravity(velocity, gravity);
    expect(newVelocity).toBe(0.5);
  });

  it('should update position based on velocity', () => {
    const pos = 100;
    const velocity = 5;
    const dt = 1; // delta time
    const newPos = updatePosition(pos, velocity, dt);
    expect(newPos).toBe(105);
  });

  it('should handle negative velocity (moving up)', () => {
    const velocity = -5;
    const gravity = 0.5;
    const newVelocity = applyGravity(velocity, gravity);
    expect(newVelocity).toBe(-4.5);
  });
});
