export function applyGravity(velocity: number, gravity:number): number {
  return velocity + gravity;
}

export function updatePosition(position: number, velocity: number, deltaTime: number): number {
  return position + (velocity * deltaTime);
}

export function applyJumpImpulse(velocity: number, jumpStrength: number): number {
  return velocity + jumpStrength;
}

export function updateHorizontalVelocity(currentVelocityX: number, direction: number, speed: number): number {
  return direction * speed;
}
