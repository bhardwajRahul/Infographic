import type { JSXElement, PathProps } from '../types';

export function Path({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  ...props
}: PathProps): JSXElement {
  const node: JSXElement = {
    type: 'path',
    props,
  };
  // TODO scale path to fit width/height
  return node;
}
