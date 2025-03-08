const { parentPort } = require('worker_threads');
const addon = require('./build/Release/addon.node');

const instance = addon.get('service1');
parentPort.postMessage(instance.fetchPersons());

// ------------------------------

// const { parentPort } = require('worker_threads');
// const addon = require('./build/Release/addon.node');

// console.log('🛠️ Worker iniciado, llamando a fetchPersons...');

// addon.callFetchPersons('service1', (err, result) => {
//   if (err) {
//     console.error('❌ Error al ejecutar fetchPersons:', err);
//     parentPort.postMessage({ error: err });
//   } else {
//     console.log('✅ Resultado obtenido:', result);
//     parentPort.postMessage(result);
//   }
// });

