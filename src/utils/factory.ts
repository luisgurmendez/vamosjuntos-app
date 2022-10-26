export function randomId(): string {
  return Math.random().toString(36).slice(2);
}

export function randomFromList<T>(list: T[]): T {
  return list[randomIntFromInterval(0, list.length - 1)];
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
