<script setup lang="ts">
import { useUserStore } from '~/src/store/user.store'
import Lobby from '~/src/components/lobby/lobby.vue'
import { useLobbyStore } from '~/src/store/lobby.store'
import CreateLobbyModal from '~/src/components/lobby/create-lobby-modal.vue'

const userStore = useUserStore()
const lobbyStore = useLobbyStore()

if (!userStore.user) {
  navigateTo('/login')
}

const onStartGame = async (lobbyId: string) => {
  // await LobbyService.startGame(lobbyId)
}
</script>

<template>
  <div class="w-full flex flex-col items-center mt-32 gap-4">
    <lobby
      v-for="lobby in lobbyStore.lobbies"
      :lobby="lobby"
      @join-lobby="lobbyStore.joinLobby(lobby.id)"
      @start-game="onStartGame()"
      :key="lobby.id"
    />

    <create-lobby-modal />
  </div>
</template>

<style scoped></style>
