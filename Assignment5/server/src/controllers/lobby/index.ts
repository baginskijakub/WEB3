import express from 'express'
import { createLobbyEndpoint } from './lobby.create'
import { joinLobbyEndpoint } from './lobby.join'
import { getAllLobbiesEndpoint } from './lobby.get.all'


const router = express.Router();

router.post("/create", createLobbyEndpoint);
router.post("/join", joinLobbyEndpoint);
router.get("/", getAllLobbiesEndpoint)


export default router;