import { getDatumByIndexes } from '@/utils/data';
import type { Data } from '@antv/infographic';
import { describe, expect, it } from 'vitest';

describe('data', () => {
  describe('getDatumByIndexes', () => {
    const mockData: Data = {
      items: [
        {
          id: '1',
          label: 'item1',
          children: [
            {
              id: '1-1',
              label: 'item1-1',
              children: [
                { id: '1-1-1', label: 'item1-1-1' },
                { id: '1-1-2', label: 'item1-1-2' },
              ],
            },
            { id: '1-2', label: 'item1-2' },
          ],
        },
        {
          id: '2',
          label: 'item2',
          children: [{ id: '2-1', label: 'item2-1' }],
        },
      ],
    };

    it('should return empty object for empty indexes array', () => {
      const result = getDatumByIndexes(mockData, []);
      expect(result).toEqual({});
    });

    it('should return first level item for single index', () => {
      const result = getDatumByIndexes(mockData, [0]);
      expect(result).toEqual({
        id: '1',
        label: 'item1',
        children: [
          {
            id: '1-1',
            label: 'item1-1',
            children: [
              { id: '1-1-1', label: 'item1-1-1' },
              { id: '1-1-2', label: 'item1-1-2' },
            ],
          },
          { id: '1-2', label: 'item1-2' },
        ],
      });
    });

    it('should return second level item for two indexes', () => {
      const result = getDatumByIndexes(mockData, [0, 0]);
      expect(result).toEqual({
        id: '1-1',
        label: 'item1-1',
        children: [
          { id: '1-1-1', label: 'item1-1-1' },
          { id: '1-1-2', label: 'item1-1-2' },
        ],
      });
    });

    it('should return third level item for three indexes', () => {
      const result = getDatumByIndexes(mockData, [0, 0, 1]);
      expect(result).toEqual({
        id: '1-1-2',
        label: 'item1-1-2',
      });
    });

    it('should return correct item for different index combinations', () => {
      const result1 = getDatumByIndexes(mockData, [1]);
      expect(result1).toEqual({
        id: '2',
        label: 'item2',
        children: [{ id: '2-1', label: 'item2-1' }],
      });

      const result2 = getDatumByIndexes(mockData, [1, 0]);
      expect(result2).toEqual({
        id: '2-1',
        label: 'item2-1',
      });
    });
  });
});
