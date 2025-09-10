import type { SVGAttributes } from 'react';
import type { JSXElement } from './jsx';

export interface BaseGeometryProps extends SVGAttributes<SVGElement> {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface SVGProps extends BaseGeometryProps {}
export interface DefsProps {
  children?: JSXElement | JSXElement[];
}
export interface GroupProps extends BaseGeometryProps {}
export interface RectProps extends BaseGeometryProps {}
export interface EllipseProps extends BaseGeometryProps {}
export interface TextProps extends BaseGeometryProps {
  lineHeight?: { unit: string; value: number };
  wordWrap?: boolean;
  alignHorizontal?: 'left' | 'center' | 'right';
  alignVertical?: 'top' | 'middle' | 'bottom';
}
export interface PathProps extends BaseGeometryProps {}
