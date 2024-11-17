import { Request, Response } from 'express'
import { DataAccess } from '../../data-access'

export const loginUserEndpoint = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const databaseResponse = await DataAccess.UserDAO.getUser({
      email,
      password
    })

    if(databaseResponse.success) {
      res.status(databaseResponse.status).send(databaseResponse.data)
      return
    }

    res.status(databaseResponse.status).send(databaseResponse.error);
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}