

export type Size = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xlg' | 'xxlg' | 'xxxlg' | 'xxxxlg'

const spacing = 1; // to easily change spacing
export const sizeToPx = (size?: Size) => {
  const sizePixelMap: { [s in Size]: number } = {
    xxs: 2 * spacing,
    xs: 4 * spacing,
    sm: 8 * spacing,
    md: 12 * spacing,
    lg: 16 * spacing,
    xlg: 24 * spacing,
    xxlg: 32 * spacing,
    xxxlg: 48 * spacing,
    xxxxlg: 64 * spacing
  }

  return size ? sizePixelMap[size] || 0 : 0;
}
