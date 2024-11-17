import { PrismaClient } from '@prisma/client'
import { Lobby } from '../../types'
import { DatabaseResponse, ErrorStatusCode, SuccessStatusCode } from '../../utils'

interface CreateLobbyParams {
  userId: number
  name: string
}

export const createLobby = async (params: CreateLobbyParams): Promise<DatabaseResponse<Lobby[]>> => {
  const { userId, name } = params

  const prisma = new PrismaClient()

  try {
    const owner = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!owner) {
      return {
        success: false,
        status: ErrorStatusCode.BadRequest,
        error: `User with id ${userId} not found`,
      };
    }

    await prisma.lobby.create({
      data: {
        name,
        ownerId: userId,
        players: {
          connect: { id: userId },
        },
      },
    });

    const allLobbies: Lobby[] = await prisma.lobby.findMany({
      include: {
        players: true,
      },
    });

    return {
      success: true,
      status: SuccessStatusCode.Created,
      data: allLobbies,
      error: undefined,
    };
  } catch (error) {
    return {
      success: false,
      status: ErrorStatusCode.InternalServerError,
      error: `Something went wrong: ${error.message}`,
    };
  } finally {
    await prisma.$disconnect(); // Close the database connection
  }
}

interface JoinLobbyParams {
  userId: number
  lobbyId: number
}

export const joinLobby = async (params: JoinLobbyParams): Promise<DatabaseResponse<Lobby>> => {
  const { userId, lobbyId } = params

  const prisma = new PrismaClient()

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return {
        success: false,
        status: ErrorStatusCode.BadRequest,
        error: `User with id ${userId} not found`,
      };
    }

    // Check if the lobby exists
    const lobby = await prisma.lobby.findUnique({
      where: { id: lobbyId },
      include: { players: true },
    });

    if (!lobby) {
      return {
        success: false,
        status: ErrorStatusCode.BadRequest,
        error: `Lobby with id ${lobbyId} not found`,
      };
    }

    // Check if the user is already in the lobby
    const isAlreadyInLobby = lobby.players.some(player => player.id === userId);

    if (isAlreadyInLobby) {
      return {
        success: false,
        status: ErrorStatusCode.BadRequest,
        error: `User with id ${userId} is already in the lobby`,
      };
    }

    // Add user to the lobby's players
    const updatedLobby = await prisma.lobby.update({
      where: { id: lobbyId },
      data: {
        players: {
          connect: { id: userId },
        },
      },
      include: { players: true },
    });

    return {
      success: true,
      status: SuccessStatusCode.OK,
      data: updatedLobby,
      error: undefined,
    }
  } catch (error) {
    return {
      success: false,
      status: ErrorStatusCode.InternalServerError,
      error: `Something went wrong: ${error.message}`,
    };
  }
}

export const getAllLobbies = async (): Promise<DatabaseResponse<Lobby[]>> => {
  const prisma = new PrismaClient()

  try {
    const allLobbies: Lobby[] = await prisma.lobby.findMany({
      include: {
        players: true,
      },
    });

    return {
      success: true,
      status: SuccessStatusCode.OK,
      data: allLobbies,
      error: undefined,
    };
  } catch (error) {
    return {
      success: false,
      status: ErrorStatusCode.InternalServerError,
      error: `Something went wrong: ${error.message}`,
    };
  } finally {
    await prisma.$disconnect(); // Close the database connection
  }
}

export const deleteLobby = async (lobbyId: number): Promise<DatabaseResponse<Lobby>> => {
    const prisma = new PrismaClient()

    try {
        const lobby = await prisma.lobby.findUnique({
          where: { id: lobbyId },
          include: { players: true },
        });

        if (!lobby) {
        return {
            success: false,
            status: ErrorStatusCode.BadRequest,
            error: `Lobby with id ${lobbyId} not found`,
        };
        }

        await prisma.lobby.delete({
          where: { id: lobbyId },
        });

        return {
          success: true,
          status: SuccessStatusCode.OK,
          data: lobby,
          error: undefined,
        }
    } catch (error) {
        return {
          success: false,
          status: ErrorStatusCode.InternalServerError,
          error: `Something went wrong: ${error.message}`,
        };
    } finally {
        await prisma.$disconnect(); // Close the database connection
    }
}

export const LobbyDAO = {
  createLobby,
  joinLobby,
  getAllLobbies,
  deleteLobby,
}
