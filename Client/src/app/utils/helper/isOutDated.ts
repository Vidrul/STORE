export function isOutDated(date: number) {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true;
  } else {
    return false;
  }
}
