import {
  getItemKey,
  getIndexesFromItemKey,
  getItemIndexes,
  getItemKeyFromIndexes,
  getIdFromIndexes,
} from '@/utils/item';
import { describe, expect, it } from 'vitest';

describe('item', () => {
  describe('getItemKey', () => {
    it('should extract item key from ID', () => {
      expect(getItemKey('item-1_2_3-button')).toBe('1_2_3');
      expect(getItemKey('item-1-text')).toBe('1');
      expect(getItemKey('item-5_10_2-icon')).toBe('5_10_2');
    });
  });

  describe('getIndexesFromItemKey', () => {
    it('should convert item key to zero-based indexes array', () => {
      expect(getIndexesFromItemKey('1_2_3')).toEqual([0, 1, 2]);
      expect(getIndexesFromItemKey('1')).toEqual([0]);
      expect(getIndexesFromItemKey('5_10_2')).toEqual([4, 9, 1]);
    });

    it('should handle custom separator', () => {
      expect(getIndexesFromItemKey('1-2-3', '-')).toEqual([0, 1, 2]);
      expect(getIndexesFromItemKey('1|2|3', '|')).toEqual([0, 1, 2]);
    });
  });

  describe('getItemIndexes', () => {
    it('should extract zero-based indexes from item ID', () => {
      expect(getItemIndexes('item-1_2_3-button')).toEqual([0, 1, 2]);
      expect(getItemIndexes('item-1-text')).toEqual([0]);
      expect(getItemIndexes('item-5_10_2-icon')).toEqual([4, 9, 1]);
    });
  });

  describe('getItemKeyFromIndexes', () => {
    it('should convert zero-based indexes to one-based item key', () => {
      expect(getItemKeyFromIndexes([0, 1, 2])).toBe('1_2_3');
      expect(getItemKeyFromIndexes([0])).toBe('1');
      expect(getItemKeyFromIndexes([4, 9, 1])).toBe('5_10_2');
    });

    it('should handle empty array', () => {
      expect(getItemKeyFromIndexes([])).toBe('');
    });
  });

  describe('getIdFromIndexes', () => {
    it('should generate complete item ID from item type and indexes', () => {
      expect(getIdFromIndexes('button', [0, 1, 2])).toBe('item-1_2_3-button');
      expect(getIdFromIndexes('text', [0])).toBe('item-1-text');
      expect(getIdFromIndexes('icon', [4, 9, 1])).toBe('item-5_10_2-icon');
    });

    it('should handle empty indexes array', () => {
      expect(getIdFromIndexes('button', [])).toBe('item--button');
    });
  });
});