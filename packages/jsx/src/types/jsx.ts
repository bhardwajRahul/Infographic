export interface JSXElement {
  type: string | Symbol | Function;
  props: any;
  children?: JSXElement[];
  key?: string | null;
}

export type WithChildren<T> = T & { children?: JSXElement | JSXElement[] };
