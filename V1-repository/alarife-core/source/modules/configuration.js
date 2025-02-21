/**
 * Se importa para que siempre este antes que el launcher.
 */
// eslint-disable-next-line no-unused-vars
import launcher from './launcher.js';
import CoreConfiguration from '../services/Configuration';

export default new CoreConfiguration();

