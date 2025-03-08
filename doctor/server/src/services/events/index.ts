import { Namespace } from "socket.io";
import { socket } from "../socket";
import { FrontendEvent } from "../../model/FrontendEvents";

let ioEvent: Namespace;
export let cacheEvents: FrontendEvent[] = [];

export const startEventSocket = () => {
  ioEvent = socket.of('/event');
  ioEvent.on('connection', (socket) => {
    console.log('Socket connected');

    // socket.emit('eventMessage', 'Connected to event queue');

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  });
}

export const newEvent = (event: FrontendEvent) => {
  ioEvent.emit('eventMessage', event);
  cacheEvents.push(event);

  if (cacheEvents.length > 10000) {
    cacheEvents.shift();
  }
}