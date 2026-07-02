import { applyGravity, applyJumpImpulse, updatePosition, updateHorizontalVelocity } from '../core/physics';
import { Rect } from '../core/collision';

export class Player {
  public vx = 0;
  public vy = 0;
  public isInvulnerable = false;
  public jumpMultiplier = 1;

  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    private gravity: number,
    private jumpStrength: number,
    private speed: number
  ) {}

  public update(dt: number, directionX: number) {
    this.vx = updateHorizontalVelocity(this.vx, directionX, this.speed);
    this.vy = applyGravity(this.vy, this.gravity);
    
    this.x = updatePosition(this.x, this.vx, dt);
    this.y = updatePosition(this.y, this.vy, dt);
  }

  public jump() {
    this.vy = applyJumpImpulse(this.vy, this.jumpStrength * this.jumpMultiplier);
  }

  public setPowerup(type: string) {
    if (type === 'spring') {
      this.jumpMultiplier = 2;
      // In a real game, we would reset this after some time/bounce
    } else if (type === 'shield') {
      this.isInvulnerable = true;
    }
  }

  public getBounds(): Rect {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }
}
