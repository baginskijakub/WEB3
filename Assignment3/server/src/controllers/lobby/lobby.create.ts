import { DataAccess } from '../../data-access'
import { Request, Response } from 'express'
import { broadcastLobbiesChange } from './lobby.sync'

export const createLobbyEndpoint = async (req: Request, res: Response) => {
  const { userId, name } = req.body

  try {
    const databaseResponse = await DataAccess.LobbyDAO.createLobby({
      userId,
      name
    })

    if (databaseResponse.success) {
      broadcastLobbiesChange()
      res.status(databaseResponse.status).send(databaseResponse.data)
      return
    }

    res.status(databaseResponse.status).send(databaseResponse.error)


  } catch (error) {
    res.status(500).send({
      message: error.message,
    })
  }
}
