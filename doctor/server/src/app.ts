import http from 'http';

import configuration from './configuration';
import {startSocketServer} from './services/socket';
import { startEventSocket } from './services/events';
import express from './services/express';
import { initMonitor } from './services/monitor';

export async function start() {
  const { ip, port } = configuration;
  const app = express();
  const server = http.createServer(app);
  
  startSocketServer(server);
  startEventSocket();

  const pid = configuration.pid ?? process.pid;
  initMonitor(pid);

  setImmediate(() => {
    server.listen(port, ip, () => {
      console.log(`🚀 Monitor server http://localhost:${port} ~ pid: ${process.pid}`);
    });
  });
}
