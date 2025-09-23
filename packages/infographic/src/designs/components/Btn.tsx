/** @jsxImportSource @antv/infographic-jsx */
import type { RectProps } from '@antv/infographic-jsx';
import { Rect } from '@antv/infographic-jsx';
import { getItemKeyFromIndexes } from '../../utils';

export interface BtnProps extends RectProps {
  indexes: number[];
}

export const BtnAdd = (props: BtnProps) => {
  const { indexes, ...restProps } = props;
  const defaultProps: RectProps = {
    id: `btn-add-${getItemKeyFromIndexes(indexes)}`,
    fill: '#B9EBCA',
    fillOpacity: 0.3,
    width: 20,
    height: 20,
  };
  return <Rect {...defaultProps} {...restProps} />;
};

export const BtnRemove = (props: BtnProps) => {
  const { indexes, ...restProps } = props;
  const defaultProps: RectProps = {
    id: `btn-remove-${getItemKeyFromIndexes(indexes)}`,
    fill: '#F9C0C0',
    fillOpacity: 0.3,
    width: 20,
    height: 20,
  };
  return <Rect {...defaultProps} {...restProps} />;
};
