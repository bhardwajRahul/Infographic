import type { JSXElement } from './types';

export function jsx(type: string | Function, props: any): JSXElement {
  const { children } = props || {};

  const node: JSXElement = { type, props: { ...props } };

  if (children) {
    node.children = Array.isArray(children) ? children : [children];
  }

  return node;
}

export function Fragment(props: {
  children?: JSXElement | JSXElement[];
}): JSXElement {
  const node: JSXElement = {
    type: 'Fragment',
    props: {},
  };

  if (props.children) {
    node.children = Array.isArray(props.children)
      ? props.children
      : [props.children];
  }

  return node;
}

export const jsxs = jsx;
export const jsxDEV = jsx;
