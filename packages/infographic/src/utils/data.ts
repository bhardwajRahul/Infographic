import get from 'lodash-es/get';
import type { Data, ItemDatum } from '../types';

/**
 * 根据 indexesKey 获取数据项
 */
export function getDatumByIndexes(data: Data, indexes: number[]): ItemDatum {
  if (indexes.length === 0) return {} as ItemDatum;
  const base = data.items[indexes[0]];
  if (indexes.length === 1) return base;

  const path = indexes
    .slice(1)
    .map((i) => `children[${i}]`)
    .join('.');

  return get(base, path);
}
