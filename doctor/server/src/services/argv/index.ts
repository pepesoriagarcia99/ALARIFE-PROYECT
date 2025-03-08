import configuration from '../../configuration';

export default (): Promise<any> => {
  const args = process.argv.slice(2);
  args.forEach((arg) => {
    const [key, value] = arg.split('=');

    switch (key) {
      case 'env':
        configuration.env = value;
        break;
      case 'ip':
        configuration.ip = value;
        break;
      case 'port':
        configuration.port = Number(value);
        break;
      case 'pid':
        configuration.pid = Number(value);
        break;
    }
  });

  /** Se muestra el ouput asi para que cuando se inicialice logger ya este configurada la ruta */
  args.forEach((arg) => {
    const [key, value] = arg.split('=');
    console.log(`Argumento ${key}: ${value}`);

    if (!['env', 'ip', 'port', 'pid'].includes(key)) {
      console.warn(`El argumento ${key} no es reconocido.`);
    }
  });

  return Promise.resolve();
};
