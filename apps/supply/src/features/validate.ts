export function validate(value: number): boolean {
  if (value < 0 || value > 10) {
    return false;
  } else {
    return true;
  }
}
