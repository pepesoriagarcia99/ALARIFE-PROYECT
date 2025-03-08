import express, { Application, Router } from 'express';

import cors from 'cors';
import compression from 'compression';
import path from 'path';
import { cacheEvents } from '../events';

export default (): Application => {
  const app = express();

  app.use(cors());
  app.use(compression());

  app.get('/api/event', (req, res) => {
    res.status(200).json(cacheEvents).end();
  });

  const distPath = path.join(__dirname, 'browser');
  app.use(express.static(distPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });

  return app;
};
