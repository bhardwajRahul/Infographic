import type { GroupProps, JSXElement } from '../types';

export function Group({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  ...props
}: GroupProps): JSXElement {
  if (x || y) {
    props.transform = `translate(${x}, ${y})${props.transform ? ' ' + props.transform : ''}`;
  }
  const node: JSXElement = {
    type: 'g',
    props,
  };
  if (props.children) {
    node.children = Array.isArray(props.children)
      ? props.children
      : [props.children];
  }
  return node;
}
