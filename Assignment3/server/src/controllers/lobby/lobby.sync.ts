import { WebSocket } from 'ws';
import { DataAccess } from '../../data-access'

const connectedClients: WebSocket[] = [];

export const syncLobbies = (ws: WebSocket) => {
  console.log('lolo')
  if (!connectedClients.includes(ws)) {
    connectedClients.push(ws);
  }

  ws.on('close', () => {
    const index = connectedClients.indexOf(ws);

    if (index !== -1) {
      connectedClients.splice(index, 1);
    }
  });
};

export const broadcastLobbiesChange = async () => {
  const databaseResponse = await DataAccess.LobbyDAO.getAllLobbies();

  if(!databaseResponse.success) {
    return;
  }

  console.log('broadcasting lobby change');

  const message = JSON.stringify({
    type: 'LOBBY_CHANGE',
    payload: databaseResponse.data,
  });

  console.log('connected clients:', connectedClients.length);

  connectedClients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      console.log('sending message to client');
      client.send(message);
    }
  });
};