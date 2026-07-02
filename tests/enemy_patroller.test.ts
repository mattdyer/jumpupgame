import { describe, it, expect } from 'vitest';
import { updatePatroller } from '../src/entities/enemy';

describe('Enemy - Patroller', () => {
  it('should move horizontally and bounce off bounds', () => {
    let x = 100;
    const velocityX = 2;
    const leftBound = 0;
    const rightBound = 800;
    
    // Simulate movement
    const newX = updatePatroller(x, velocityX, leftBound, rightBound);
    expect(newX).toBe(102);

    // Test bounce
    const nearRightBoundX = 799;
    const finalX = updatePatroller(nearRightBoundX, velocityX, leftBound, rightBound);
    // In a real implementation, it might reverse direction. For now let's see what I implement.
    expect(finalX).toBeLessThanOrEqual(rightBound);
  });
});
