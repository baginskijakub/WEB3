import { WebSocket } from 'ws';
import { DataAccess } from '../../data-access'
import {startGame} from "../game/game.sync";

const connectedClients: WebSocket[] = [];

export const syncLobbies = (ws: WebSocket) => {
  if (!connectedClients.includes(ws)) {
    connectedClients.push(ws);
  }

  ws.on('close', () => {
    const index = connectedClients.indexOf(ws);

    if (index !== -1) {
      connectedClients.splice(index, 1);
    }
  });

  ws.on('message', async (message) => {
    const { type, payload } = JSON.parse(message.toString());

    if (type === 'LOBBY_START') {
      const databaseResponse = await DataAccess.LobbyDAO.deleteLobby(payload.lobbyId);

      if (!databaseResponse.success) {
        return;
      }

      startGame(databaseResponse.data)

      const message = JSON.stringify({
        type: 'LOBBY_STARTED',
        payload: {
          lobbyId: databaseResponse.data.id
        },
      });

      connectedClients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });

      await broadcastLobbiesChange();
    }
  })
};

export const broadcastLobbiesChange = async () => {
  const databaseResponse = await DataAccess.LobbyDAO.getAllLobbies();

  if(!databaseResponse.success) {
    return;
  }

  const message = JSON.stringify({
    type: 'LOBBY_CHANGE',
    payload: databaseResponse.data,
  });

  connectedClients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

const handleMessages = (ws: WebSocket) => {

}