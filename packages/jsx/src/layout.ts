import type {
  ComponentType,
  JSXElement,
  RenderContext,
  WithChildren,
} from './types';

type LayoutFunction<T = {}> = (
  element: JSXElement,
  children: JSXElement[],
  props: T,
  context: RenderContext,
) => JSXElement[];

const LAYOUT_FN_MAP = new Map<Symbol, LayoutFunction<any>>();
const LAYOUT_COMPONENT_MAP = new Map<Symbol, ComponentType<any>>();

export function createLayout<T = {}>(
  name: string,
  fn: LayoutFunction<WithChildren<T>>,
): ComponentType<WithChildren<T>> {
  const type = Symbol.for(name);

  LAYOUT_FN_MAP.set(type, fn);
  if (LAYOUT_COMPONENT_MAP.has(type)) {
    return LAYOUT_COMPONENT_MAP.get(type) as ComponentType<T>;
  }
  const Component: ComponentType<WithChildren<T>> = (props) => {
    const { children } = props;
    return {
      type,
      props,
      children,
    } as JSXElement;
  };
  LAYOUT_COMPONENT_MAP.set(type, Component);
  return Component;
}

export function isLayoutComponent(
  element: JSXElement,
): element is JSXElement & { type: Symbol } {
  return typeof element.type === 'symbol' && LAYOUT_FN_MAP.has(element.type);
}

export function performLayout(
  element: JSXElement,
  context: RenderContext,
): JSXElement[] {
  if (!isLayoutComponent(element)) return [];

  const layoutFn = LAYOUT_FN_MAP.get(element.type as Symbol);
  if (!layoutFn) return [];

  const { children = [], props = {} } = element;
  return layoutFn(element, children, props, context);
}
