import { DataAccess } from '../../data-access'
import { Request, Response } from 'express'

export const joinLobbyEndpoint = async (req: Request, res: Response) => {
  const { userId, lobbyId } = req.body

  try {
    const databaseResponse = await DataAccess.LobbyDAO.joinLobby({
      userId,
      lobbyId,
    });

    if (databaseResponse.success) {
      res.status(databaseResponse.status).send(databaseResponse.data);
      return;
    }

    res.status(databaseResponse.status).send(databaseResponse.error);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
}
