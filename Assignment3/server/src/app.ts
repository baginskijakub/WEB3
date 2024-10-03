import express from 'express'
import expressWs from "@wll8/express-ws";
import router from "./controllers";
import cors from 'cors';
import {syncLobbies} from "./controllers/lobby/lobby.sync";


const {app, wsRoute} = expressWs(express())

const options = {
  origin: '*',
  credentials: true,
};

app.use(cors(options));
app.use(express.json());
app.use(router)
app.ws('/', (ws, req) => {
 syncLobbies(ws);
})

// setupWebSocketRoutes(app as expressWs.Application);

export { app };