export interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function generatePlatforms(count: number): Platform[] {
  const platforms: Platform[] = [];
  const width = 800;
  const height = 600;

  for (let i = 1; i <= count; i++) {
    platforms.push({
      x: Math.random() * (width - 50),
      y: i * (height / (count + 1)),
      width: 50 + Math.random() * 50,
      height: 10,
    });
  }

  return platforms;
}
