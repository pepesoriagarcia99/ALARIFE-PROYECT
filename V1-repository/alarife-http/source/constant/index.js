export const DEFAULT_PROTOCOL = 'http';
export const SECURE_PROTOCOL = 'https';

export const DEFAULT_PORT = 9000;
export const DEFAULT_SECURE_PORT = 443;

export const DEFAULT_KEY = 'key.pem';
export const DEFAULT_CERT = 'cert.pem';

export const DEFAULT_IP = '0.0.0.0';
export const DEFAULT_API_ROOT = '/';

export const DEFAULT_ACCESS_LOG_STATE = true;

/**
 * argv para deshabilitar access.log
 *
 * ! cuando se configure un gateway se debe deshabilitar el access.log de los micorservicios
 *
 * node index.js --no-access-log
 */
