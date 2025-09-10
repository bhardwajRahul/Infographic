import { Bounds, JSXElement } from '../types';

export function getElementBounds(element: JSXElement): Bounds {
  const props = element.props ?? {};
  const { type } = element;

  // 如果元素自身有明确尺寸，直接返回
  if (props.width !== undefined && props.height !== undefined) {
    return {
      x: props.x ?? 0,
      y: props.y ?? 0,
      width: props.width,
      height: props.height,
    };
  }

  // 如果是函数组件，执行它以得到真实节点
  const resolved = typeof type === 'function' ? (type as any)(props) : element;

  // 如果函数组件直接返回一个数组（Fragment 风格），处理为多子节点
  if (Array.isArray(resolved)) {
    return getElementsBounds(resolved);
  }

  // 尝试读取 resolved 节点上的 props（如果存在）
  const resolvedProps = (resolved && (resolved as any).props) ?? {};

  // 如果 resolved 节点上有明确尺寸，则以 resolved 的尺寸为准（位置优先使用 resolvedProps，再 fallback 到原 props）
  if (resolvedProps.width !== undefined && resolvedProps.height !== undefined) {
    return {
      x: resolvedProps.x ?? props.x ?? 0,
      y: resolvedProps.y ?? props.y ?? 0,
      width: resolvedProps.width,
      height: resolvedProps.height,
    };
  }

  // 处理 children（既可能在 resolved.children，也可能在 resolvedProps.children）
  const rawChildren =
    (resolved && (resolved as any).children) ??
    resolvedProps.children ??
    undefined;

  let children: JSXElement[] = [];
  if (Array.isArray(rawChildren)) {
    children = rawChildren.filter(Boolean);
  } else if (rawChildren) {
    children = [rawChildren];
  }

  if (children.length > 0) {
    return getElementsBounds(children as JSXElement[]);
  }

  // 最后兜底：使用任何可用的位置/尺寸信息（都可能为 0）
  return {
    x: resolvedProps.x ?? props.x ?? 0,
    y: resolvedProps.y ?? props.y ?? 0,
    width: resolvedProps.width ?? props.width ?? 0,
    height: resolvedProps.height ?? props.height ?? 0,
  };
}

export function getElementsBounds(elements: JSXElement[]): Bounds {
  if (!elements || elements.length === 0) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  const boundsList = elements.map(getElementBounds);

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const b of boundsList) {
    minX = Math.min(minX, b.x);
    minY = Math.min(minY, b.y);
    maxX = Math.max(maxX, b.x + b.width);
    maxY = Math.max(maxY, b.y + b.height);
  }

  if (minX === Infinity || minY === Infinity) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}
