import { DataAccess } from '../../data-access'
import { Request, Response } from 'express'


export const createUserEndpoint = async (req: Request, res: Response) => {
  const { email, password, name } = req.body

  try {
    const databaseResponse = await DataAccess.UserDAO.createUser({
      email,
      password,
      name
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