import {Color, User} from "@/types";
interface IGameStore {
    initWs: (id: number) => void
    playCard: (cardIndex: number, requestColor?: Color) => void
    drawCard: () => void
    sayUno: () => void
    accuseOfNotSayingUno: (accused: number) => void
}

interface ILobbyStore {
    lobbies: any
    joinLobby: (lobbyId: string) => void
    createLobby: (lobbyName: string) => void
    startLobby: (lobbyId: string) => void
}

interface IPlayerStore {
    playerCards: any
    playCard: (cardIndex: number) => void
    drawCard: () => void
    isPlayerInTurn: any
    playWildCard: (color: Color) => void
    displayRequestColorModal: any
    sayUno: () => void
}

interface IUserStore {
    user: User
    setUser: (user: User | null) => void
    login: (email: string, password: string) => void
    register: (email: string, name: string, password: string) => void
    logout: () => void
}