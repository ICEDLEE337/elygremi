export function decode(token: string) {
  return JSON.parse(atob(token.split('.')[1]));
}
