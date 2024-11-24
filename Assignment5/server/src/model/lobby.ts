import type { User } from "./user";

export type Lobby = {
  id: number;
  name: string;
  ownerId: number;
  players: User[];
};
