import type { JSXElement, TextProps } from '../types';

export function Text({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  ...props
}: TextProps): JSXElement {
  const node: JSXElement = {
    type: 'text',
    props: {
      x,
      y,
      width,
      height,
      ...props,
    },
  };
  return node;
}
