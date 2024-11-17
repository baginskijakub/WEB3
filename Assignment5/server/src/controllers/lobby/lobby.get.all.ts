import { DataAccess } from '../../data-access'
import { Request, Response } from 'express'

export const getAllLobbiesEndpoint = async (req: Request, res: Response) => {
  try {
    const databaseResponse = await DataAccess.LobbyDAO.getAllLobbies();

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