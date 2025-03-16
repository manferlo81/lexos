export function expectedTestResult(value: string) {
  return {
    length: value.length,
    value,
  }
}

export function expectedTokenResult(value: string, type: string) {
  return {
    length: value.length,
    token: { type, value },
  }
}
