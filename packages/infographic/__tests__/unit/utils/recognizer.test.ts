import {
  isBtnAdd,
  isBtnRemove,
  isBtnsGroup,
  isDesc,
  isEditArea,
  isIllus,
  isItemDesc,
  isItemElement,
  isItemGroup,
  isItemIcon,
  isItemIconGroup,
  isItemIllus,
  isItemLabel,
  isItemsGroup,
  isItemShape,
  isItemShapesGroup,
  isItemStaticElement,
  isItemValue,
  isShape,
  isShapeGroup,
  isText,
  isTitle,
} from '@/utils/recognizer';
import { beforeAll, describe, expect, it } from 'vitest';

function createMockElement(id: string, tagName = 'g'): SVGElement {
  const element = document.createElementNS(
    'http://www.w3.org/2000/svg',
    tagName,
  );
  element.id = id;
  return element;
}

describe('recognizer', () => {
  beforeAll(() => {
    if (typeof global.SVGTextElement === 'undefined') {
      global.SVGTextElement = class SVGTextElement {} as any;
    }
  });
  describe('isTitle', () => {
    it('should recognize title element', () => {
      expect(isTitle(createMockElement('title'))).toBe(true);
      expect(isTitle(createMockElement('not-title'))).toBe(false);
      expect(isTitle(createMockElement(''))).toBe(false);
    });
  });

  describe('isDesc', () => {
    it('should recognize desc element', () => {
      expect(isDesc(createMockElement('desc'))).toBe(true);
      expect(isDesc(createMockElement('not-desc'))).toBe(false);
    });
  });

  describe('isShape', () => {
    it('should recognize shape elements', () => {
      expect(isShape(createMockElement('shape-circle'))).toBe(true);
      expect(isShape(createMockElement('shape-rect'))).toBe(true);
      expect(isShape(createMockElement('not-shape'))).toBe(false);
    });
  });

  describe('isIllus', () => {
    it('should recognize illus elements', () => {
      expect(isIllus(createMockElement('illus-test'))).toBe(true);
      expect(isIllus(createMockElement('illus-test-variant'))).toBe(true);
      expect(isIllus(createMockElement('not-illus'))).toBe(false);
      expect(isIllus(createMockElement('illus'))).toBe(false);
    });
  });

  describe('isText', () => {
    it('should recognize text elements by tag name', () => {
      const textElement = createMockElement('any-id', 'text');
      Object.setPrototypeOf(textElement, SVGTextElement.prototype);

      expect(isText(textElement)).toBe(true);
      expect(isText(createMockElement('any-id', 'g'))).toBe(false);
    });
  });

  describe('isShapeGroup', () => {
    it('should recognize shape group elements', () => {
      expect(isShapeGroup(createMockElement('union-shapes'))).toBe(true);
      expect(isShapeGroup(createMockElement('union-shapes-variant'))).toBe(
        true,
      );
      expect(isShapeGroup(createMockElement('not-shapes'))).toBe(false);
    });
  });

  describe('isItemsGroup', () => {
    it('should recognize items group element', () => {
      expect(isItemsGroup(createMockElement('items-group'))).toBe(true);
      expect(isItemsGroup(createMockElement('not-items-group'))).toBe(false);
    });
  });

  describe('isItemElement', () => {
    it('should recognize item elements', () => {
      expect(isItemElement(createMockElement('item-1'))).toBe(true);
      expect(isItemElement(createMockElement('item-1_2_3'))).toBe(true);
      expect(isItemElement(createMockElement('item-1-button'))).toBe(true);
      expect(isItemElement(createMockElement('not-item'))).toBe(false);
    });
  });

  describe('isItemGroup', () => {
    it('should recognize item group elements', () => {
      expect(isItemGroup(createMockElement('item-1'))).toBe(true);
      expect(isItemGroup(createMockElement('item-1_2_3'))).toBe(true);
      expect(isItemGroup(createMockElement('item-1-button'))).toBe(false);
    });
  });

  describe('isItemIcon', () => {
    it('should recognize item icon elements', () => {
      expect(isItemIcon(createMockElement('item-1-icon'))).toBe(true);
      expect(isItemIcon(createMockElement('item-1_2_3-icon'))).toBe(true);
      expect(isItemIcon(createMockElement('item-1-icon-variant'))).toBe(true);
      expect(isItemIcon(createMockElement('not-item-icon'))).toBe(false);
    });
  });

  describe('isItemIconGroup', () => {
    it('should recognize item icon group elements', () => {
      expect(isItemIconGroup(createMockElement('item-1-group-icon'))).toBe(
        true,
      );
      expect(isItemIconGroup(createMockElement('item-1_2_3-group-icon'))).toBe(
        true,
      );
      expect(isItemIconGroup(createMockElement('item-1-icon'))).toBe(false);
    });
  });

  describe('isItemLabel', () => {
    it('should recognize item label elements', () => {
      expect(isItemLabel(createMockElement('item-1-label'))).toBe(true);
      expect(isItemLabel(createMockElement('item-1_2_3-label'))).toBe(true);
      expect(isItemLabel(createMockElement('not-item-label'))).toBe(false);
    });
  });

  describe('isItemDesc', () => {
    it('should recognize item desc elements', () => {
      expect(isItemDesc(createMockElement('item-1-desc'))).toBe(true);
      expect(isItemDesc(createMockElement('item-1_2_3-desc'))).toBe(true);
      expect(isItemDesc(createMockElement('not-item-desc'))).toBe(false);
    });
  });

  describe('isItemValue', () => {
    it('should recognize item value elements', () => {
      expect(isItemValue(createMockElement('item-1-value'))).toBe(true);
      expect(isItemValue(createMockElement('item-1_2_3-value'))).toBe(true);
      expect(isItemValue(createMockElement('not-item-value'))).toBe(false);
    });
  });

  describe('isItemIllus', () => {
    it('should recognize item illus elements', () => {
      expect(isItemIllus(createMockElement('item-1-illus'))).toBe(true);
      expect(isItemIllus(createMockElement('item-1_2_3-illus-variant'))).toBe(
        true,
      );
      expect(isItemIllus(createMockElement('not-item-illus'))).toBe(false);
    });
  });

  describe('isItemShape', () => {
    it('should recognize item shape elements', () => {
      expect(isItemShape(createMockElement('item-1-shape'))).toBe(true);
      expect(isItemShape(createMockElement('item-1_2_3-shape-variant'))).toBe(
        true,
      );
      expect(isItemShape(createMockElement('not-item-shape'))).toBe(false);
    });
  });

  describe('isItemShapesGroup', () => {
    it('should recognize item shapes group elements', () => {
      expect(isItemShapesGroup(createMockElement('item-1-union-shapes'))).toBe(
        true,
      );
      expect(
        isItemShapesGroup(createMockElement('item-1_2_3-union-shapes-variant')),
      ).toBe(true);
      expect(isItemShapesGroup(createMockElement('not-item-shapes'))).toBe(
        false,
      );
    });
  });

  describe('isItemStaticElement', () => {
    it('should recognize item static elements', () => {
      expect(isItemStaticElement(createMockElement('item-1-static'))).toBe(
        true,
      );
      expect(
        isItemStaticElement(createMockElement('item-1_2_3-static-variant')),
      ).toBe(true);
      expect(isItemStaticElement(createMockElement('not-item-static'))).toBe(
        false,
      );
    });
  });

  describe('isEditArea', () => {
    it('should recognize edit area element', () => {
      expect(isEditArea(createMockElement('edit-area'))).toBe(true);
      expect(isEditArea(createMockElement('not-edit-area'))).toBe(false);
    });
  });

  describe('isBtnsGroup', () => {
    it('should recognize btns group element', () => {
      expect(isBtnsGroup(createMockElement('btns-group'))).toBe(true);
      expect(isBtnsGroup(createMockElement('not-btns-group'))).toBe(false);
    });
  });

  describe('isBtnAdd', () => {
    it('should recognize btn add elements', () => {
      expect(isBtnAdd(createMockElement('btn-add-1'))).toBe(true);
      expect(isBtnAdd(createMockElement('btn-add-1_2_3'))).toBe(true);
      expect(isBtnAdd(createMockElement('not-btn-add'))).toBe(false);
    });
  });

  describe('isBtnRemove', () => {
    it('should recognize btn remove elements', () => {
      expect(isBtnRemove(createMockElement('btn-remove-1'))).toBe(true);
      expect(isBtnRemove(createMockElement('btn-remove-1_2_3'))).toBe(true);
      expect(isBtnRemove(createMockElement('not-btn-remove'))).toBe(false);
    });
  });
});
