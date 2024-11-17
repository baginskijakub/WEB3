import { PrismaClient } from '@prisma/client'
import { DatabaseResponse, ErrorStatusCode, SuccessStatusCode } from '../../utils'
import { User } from '../../types'

type CreateUserParams  = Omit<User, 'id'>

export const createUser = async (params: CreateUserParams): Promise<DatabaseResponse<User>> => {
  const prisma = new PrismaClient()

  const existingUser = await prisma.user.findFirst({
    where: {
      email: params.email
    }
  })

  if(existingUser) {
    return {
      success: false,
      status: ErrorStatusCode.BadRequest,
      error: 'User already exists'
    }
  }

  const user = await prisma.user.create({
    data: params
  })


  return {
    success: true,
    status: SuccessStatusCode.Created,
    data: user,
    error: undefined
  }
}

export type GetUserParams = Pick<User, 'email' | 'password'>

export const getUser = async (params: GetUserParams): Promise<DatabaseResponse<User>> => {
  const { email, password } = params

  const prisma = new PrismaClient()

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if(!user) {
    return {
      success: false,
      status: ErrorStatusCode.NotFound,
      error: 'User not found'
    }
  }

  if(user.password !== password) {
    return {
      success: false,
      status: ErrorStatusCode.Unauthorized,
      error: 'Invalid password'
    }
  }

  return {
    success: true,
    status: SuccessStatusCode.OK,
    data: user,
    error: undefined
  }
}

export const UserDAO = {
  createUser,
  getUser
}