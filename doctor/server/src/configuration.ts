interface Configuration {
  env: string;
  ip: string;
  port: number;
  pid?: number;
}

/**
 * TODO: Archivo con variables de entorno no configurado
 */
export default {
  env: process.env.NODE_ENV || 'development',
  ip: process.env.IP || '0.0.0.0',
  port: Number(process.env.PORT) || 8088 ,
  pid: undefined
} as Configuration;
