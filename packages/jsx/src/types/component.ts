import type { JSXElement } from './jsx';

export type ComponentType<P = {}> = (
  props: P,
) => JSXElement | null | string | boolean;
