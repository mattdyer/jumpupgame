import { describe, it, expect } from 'vitest';
import { calculateScore } from '../src/core/scoring';

describe('Scoring System', () => {
  it('should calculate score based on height reached', () => {
    const heightReached = 100;
    const score = calculateScore(heightReached);
    expect(score).toBe(100);
  });

  it('should not have negative score for negative height', () => {
    const heightReached = -50;
    const score = calculateScore(heightReached);
    expect(score).toBe(0);
  });

  it('should increase score significantly for higher altitudes', () => {
    const score1 = calculateScore(100);
    const score2 = 200;
    const score = calculateScore(200);
    expect(score).toBeGreaterThan(score1);
  });
});
