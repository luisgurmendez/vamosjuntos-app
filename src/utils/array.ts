
export function removeItem<T>(array: T[], item: T, comparableFn?: (i: T, item: T) => boolean) {
  const _array = [...array];
  const index = _array.findIndex(v => {
    return comparableFn ? comparableFn(v, item) : v === item
  });
  if (index > -1) {
    _array.splice(index, 1);
  }
  return _array;
}
