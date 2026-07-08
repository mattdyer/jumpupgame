import { applyGravity, applyJumpImpulse, updatePosition, updateHorizontalVelocity } from '../core/physics';
import { Rect } from '../core/collision';

export class Player {
  public vx = 0;
  public vy = 0;
  public isInvulnerable = false;
  public jumpMultiplier = 1;
  private _jumpStrength: number;
  private _gravity: number;

  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    gravity: number,
    jumpStrength: number,
    public speed: number
  ) {
    this._gravity = gravity;
    this._jumpStrength = jumpStrength;
  }

  public get jumpStrength(): number {
    return this._jumpStrength;
  }

  public set jumpStrength(value: number) {
    this._jumpStrength = value;
  }

  public get gravity(): number {
    return this._gravity;
  }

  public set gravity(value: number) {
    this._gravity = value;
  }

  public update(dt: number, directionX: number) {
    this.vx = updateHorizontalVelocity(this.vx, directionX, this.speed);
    this.vy = applyGravity(this.vy, this._gravity);
    
    this.x = updatePosition(this.x, this.vx, dt);

    this.y = updatePosition(this.y, this.vy, dt);
  }

  public jump() {
    this.vy = applyJumpImpulse(this.vy, this._jumpStrength * this.jumpMultiplier);
  }

  public setPowerup(type: string) {
    if (type === 'spring') {
      this.jumpMultiplier = 2;
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
