export function updatePatroller(x: number, velocityX: number, leftBound: number, rightBound: number): number {
  let newX = x + velocityX;
  if (newX < leftBound || newX > rightBound) {
    return x; 
  }
  return newX;
}

export function updateStinger(stingerY: number, playerY: number, range: number, speed: number): number {
  const distance = Math.abs(stingerY - playerY);
  if (distance < range) {
    // Dive towards player
    return stingerY > playerY ? stingerY - speed : stingerY + speed;
  }
  return stingerY;
}
