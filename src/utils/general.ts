
export function thisOrUndefined<T>(t: T): T | undefined {
  return t !== undefined ? t : undefined;
}