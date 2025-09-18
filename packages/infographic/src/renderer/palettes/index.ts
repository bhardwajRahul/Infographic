import { antv, spectral } from './built-in';
import { getPalette, registerPalette } from './registry';

export type { Palette } from './types';
export { getPalette, registerPalette };

registerPalette('antv', antv);
registerPalette('spectral', spectral);
