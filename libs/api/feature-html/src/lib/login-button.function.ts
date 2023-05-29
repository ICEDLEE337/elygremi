import { a } from './a.function';

export function loginButton(text: string, href: string) {
  return a(text, href, 'drop-shadow button');
}
