import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

export let socket: Server;

export const startSocketServer = (server: HttpServer) => {
  socket = new Server(server, {
    cors: {
      /**
       * TODO: Revision de seguridad, solo app-server deberia poder consumir esta peti. siempre es local
       */
      origin: "*", // http://localhost:4200
      methods: ["GET", "POST"]
    }
  });
};
