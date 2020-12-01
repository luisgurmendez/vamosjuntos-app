
export function roundToPrecision(value: number, precision = 10) {
  return Math.round(value / precision) * precision;
}
