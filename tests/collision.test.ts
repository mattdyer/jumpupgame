import { describe, it, expect } from 'vitest';
import { checkRectCollision } from '../src/core/collision';

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

describe('Collision Detection', () => {
  it('should detect collision when rectangles overlap', () => {
    const rect1: Rect = { x: 0, y: 0, width: 50, height: 50 };
    const rect2: Rect = { x: 25, y: 25, width: 50, height: 50 };
    expect(checkRectCollision(rect1, rect2)).toBe(true);
  });

  it('should not detect collision when rectangles do not overlap', () => {
    const rect1: Rect = { x: 0, y: 0, width: 50, height: 50 };
    const rect2: Rect = { x: 60, y: 60, width: 50, height: 50 };
    expect(checkRectCollision(rect1, rect2)).toBe(false);
  });
});
