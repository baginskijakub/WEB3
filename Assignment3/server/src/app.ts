import express from 'express'
import expressWs from "@wll8/express-ws";
import router from "./controllers";
import cors from 'cors';
import {syncLobbies} from "./controllers/lobby/lobby.sync";
import {syncGames} from "./controllers/game/game.sync";


const {app} = expressWs(express())

const options = {
  origin: '*',
  credentials: true,
};

app.use(cors(options));
app.use(express.json());
app.use(router)
app.ws('/lobby', (ws) => {
 syncLobbies(ws);
})
app.ws('/game/:id', (ws, req) => {
    syncGames(ws, parseInt(req.params.id));
})

// setupWebSocketRoutes(app as expressWs.Application);

export { app };


