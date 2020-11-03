export const colors = {
  danger: '#d1463d',
  main: '#4285F4',
  success: '#3bc439',
  warn: '#ffb254',
  invalid: '#ababab',
  border: '#e3e3e3',
  white: '#fff',
  black: 'rgb(5, 71, 82)',
  gray: '#888'
}

export function alpha(color: string, alphaNumber: number | string) {
  if (typeof alphaNumber === 'string' && alphaNumber.length === 2) {
    return color + alphaNumber
  } else if (typeof alphaNumber === 'number') {
    const alphaHexNum = parseInt((alphaNumber * 255).toString());
    return color + alphaHexNum.toString(16);
  }
  return color;
}