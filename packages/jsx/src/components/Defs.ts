import type { DefsProps, JSXElement } from '../types';

export function Defs(props: DefsProps): JSXElement {
  const node: JSXElement = {
    type: 'Defs',
    props,
  };
  if (props.children) {
    node.children = Array.isArray(props.children)
      ? props.children
      : [props.children];
  }
  return node;
}
