import { describe, it, expect } from 'vitest';
import { generatePlatforms } from '../src/core/platformGenerator';

describe('Platform Generator', () => {
  it('should generate a specified number of platforms', () => {
    const numPlatforms = 5;
    const platforms = generatePlatforms(numPlatforms);
    expect(platforms.length).toBe(numPlatforms);
  });

  it('should generate platforms within the screen boundaries (basic check)', () => {
    const platforms = generatePlatforms(10);
    platforms.forEach(p => {
      // Assuming Y is decreasing (going up) and between 0 and 600
      expect(p.y).toBeLessThanOrEqual(600);
      expect(p.y).toBeGreaterThan(0);
      expect(p.x).toBeGreaterThanOrEqual(0);
      // Assuming width is at least some value, e.g., 50
      expect(p.width).toBeGreaterThan(0);
    });
  });
});
