import { Application } from 'express';
import { syncLobbies } from '../lobby/lobby.sync';
import { WithWebsocketMethod } from 'express-ws'

export const setupWebSocketRoutes = (app: Application & WithWebsocketMethod) => {
  app.ws('/lobby/ws', (ws) => {
    console.log('WebSocket route hit');
    syncLobbies(ws); // Check if this triggers
  });
};