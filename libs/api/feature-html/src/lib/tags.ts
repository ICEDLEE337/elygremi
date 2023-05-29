export function tagOld(
  tag: string,
  content: any,
  attributes?: Record<string, any>
) {
  return `<${tag} ${
    attributes ? formatAttributes(attributes) : ''
  }>${content}</${tag}>`;
}
export function tag(
  tag: string,
  content: Array<string | number>,
  cssClass?: string
) {
  const classExp = cssClass ? `class="${cssClass}"` : '';
  return `<${tag} ${classExp}>${content.join?.('')}</${tag}>`;
}

function formatAttributes(attributes: Record<string, any>) {
  return Object.entries(attributes)
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ');
}

export const p = tag.bind(null, 'p');
export const td = tag.bind(null, 'td');
export const h1 = tag.bind(null, 'h1');
export const h2 = tag.bind(null, 'h2');
export const h3 = tag.bind(null, 'h3');
export const tr = tag.bind(null, 'tr');
export const th = tag.bind(null, 'th');
export const thead = tag.bind(null, 'thead');
export const tbody = tag.bind(null, 'tbody');
export const tab = tag.bind(null, 'table');
export const htm = tag.bind(null, 'html');
export const head = tag.bind(null, 'head');
export const header = tag.bind(null, 'header');
export const main = tag.bind(null, 'main');
export const body = tag.bind(null, 'body');
export const style = tag.bind(null, 'style');
