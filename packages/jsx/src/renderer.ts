import type { SVGAttributes } from 'react';
import { isLayoutComponent, performLayout } from './layout';
import type { JSXElement, RenderContext, SVGProps } from './types';
import { getElementBounds, toSVGAttr } from './utils';

export function render(element: JSXElement, context: RenderContext): string {
  if (!element) return '';
  const { type, props, children } = element;
  if (!type) return '';

  if (type === 'Fragment') {
    return children?.map((child) => render(child, context)).join('') || '';
  }

  // Collect definitions
  if (type === 'Defs') {
    children?.forEach((child) => {
      if (child) context.defs.push(child);
    });
    return '';
  }

  // Layout component
  if (isLayoutComponent(element)) {
    return renderLayout(element, context);
  }

  if (typeof type === 'function') {
    const node = type(props);
    return render(node, context);
  }

  // regular svg element
  const attrs = renderAttrs(props);
  const childrenContent = renderChildren(children, context);
  if (childrenContent) {
    return `<${type}${attrs}>${childrenContent}</${type}>`;
  } else {
    return `<${type}${attrs} />`;
  }
}

export function renderSVG(element: JSXElement, props: SVGProps = {}): string {
  const context: RenderContext = { defs: [] };
  const content = render(element, context);

  const finalProps: SVGAttributes<SVGSVGElement> = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '100%',
    height: '100%',
    ...props,
  };

  if (!finalProps.viewBox) {
    if (props.width && props.height) {
      finalProps.viewBox = `0 0 ${props.width} ${props.height}`;
    } else {
      const { x, y, width, height } = getElementBounds(element);
      finalProps.viewBox = `${x} ${y} ${width} ${height}`;
    }
  }
  const attrs = renderAttrs(finalProps);
  const defsContent = context.defs.length
    ? `<defs>${context.defs.map((def) => render(def, context)).join('')}</defs>`
    : '';

  return `<svg${attrs}>${defsContent}${content}</svg>`;
}

function renderChildren(
  children: JSXElement[] | undefined,
  context: RenderContext,
) {
  if (!children || children.length === 0) return '';
  return children.map((child) => render(child, context)).join('');
}

function renderAttrs(props: any): string {
  if (!props) return '';

  const { children, ...attributes } = props;

  return Object.entries(attributes)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => ` ${toSVGAttr(key)}="${value}"`)
    .join('');
}

function renderLayout(element: JSXElement, context: RenderContext) {
  const children = performLayout(element, context);

  const elements = children.map((child) => render(child, context));

  const attributes = renderAttrs(element.props);
  return `<g${attributes}>${elements.join('')}</g>`;
}
