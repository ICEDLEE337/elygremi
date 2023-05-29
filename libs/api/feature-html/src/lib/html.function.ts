import { body, h1, h2, head, header, htm, main, style } from './tags';

export function html(
  title: string,
  subtitle: string,
  markup: Array<string | number>
) {
  return htm([
    head([
      style([
        'body {',
        'padding: 64px;',
        `font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";`,
        `font-size: 1rem;`,
        `-webkit-font-smoothing: antialiased;`,
        `-moz-osx-font-smoothing: grayscale;`,
        'color: rgb(34, 30, 31);',
        '}',
        'h1, h2 { color: rgb(34, 30, 31) !important; }',
        'td, th { text-align: left; padding: 8px;}',
        'table { border-collapse: collapse; width: 100%;}',
        'tbody { border-width: 1px; border-style: solid; border-left-style: none; border-right-style: none; }',
        'a { padding: 12px 24px; font-weight: bold; display: block; max-width: 240px; text-align: center; border-radius: 4px; }',
        '.bg-gray { background-color: #efefef; }',
        '.drop-shadow, .button { filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.3)); }',
        '.button { text-decoration: none; margin: 32px 0; background-color: rgb(205, 62, 71); color: white !important; }',
      ]),
    ]),
    body([
      header([
        '<img height="auto" src="to be determined" />',
        h1([title]),
        h2([subtitle]),
      ]),
      main(markup),
    ]),
  ]);
}
