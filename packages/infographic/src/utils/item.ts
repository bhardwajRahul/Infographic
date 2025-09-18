// 常量定义
const DEFAULT_SEPARATOR = '_';
const ITEM_PREFIX = 'item-';

/**
 * 从 ID 中提取项目键值
 * @example getItemKey('item-1_2_3-button') => '1_2_3'
 */
export const getItemKey = (id: string): string => {
  return id.split('-')[1];
};

/**
 * 将项目键值转换为索引数组（从0开始）
 * @param key - 项目键值，如 '1_2_3'
 * @param separator - 分隔符，默认为 '_'
 * @example getIndexesFromItemKey('1_2_3') => [0, 1, 2]
 */
export const getIndexesFromItemKey = (
  key: string,
  separator: string = DEFAULT_SEPARATOR,
): number[] => {
  return key.split(separator).map((value) => parseInt(value, 10) - 1);
};

/**
 * 从项目 ID 中获取索引数组
 * @example getItemIndexes('item-1_2_3-button') => [0, 1, 2]
 */
export const getItemIndexes = (id: string): number[] => {
  const key = getItemKey(id);
  return getIndexesFromItemKey(key);
};

/**
 * 将索引数组转换为项目键值（从1开始）
 * @param indexes - 索引数组，从0开始
 * @example getItemKeyFromIndexes([0, 1, 2]) => '1_2_3'
 */
export const getItemKeyFromIndexes = (indexes: number[]): string => {
  return indexes.map((index) => index + 1).join(DEFAULT_SEPARATOR);
};

/**
 * 根据索引数组和项目类型生成完整的项目 ID
 * @param itemType - 项目类型，如 'button', 'input' 等
 * @param indexes - 索引数组，从0开始
 * @example getIdFromIndexes('button', [0, 1, 2]) => 'item-1_2_3-button'
 */
export const getIdFromIndexes = (
  itemType: string,
  indexes: number[],
): string => {
  const key = getItemKeyFromIndexes(indexes);
  return `${ITEM_PREFIX}${key}-${itemType}`;
};
