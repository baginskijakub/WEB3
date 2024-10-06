<script setup lang="ts">
import { useUserStore } from '~/src/store/user.store'
import { useLobbyStore } from '~/src/store/lobby.store'
import Lobby from '~/src/components/lobby/lobby.vue'
import CreateLobbyModal from '~/src/components/lobby/create-lobby-modal.vue'

const userStore = useUserStore()
const lobbyStore = useLobbyStore()

if (!userStore.user) {
  navigateTo('/login')
}
</script>

<template>
  <div class="w-full flex flex-col items-center mt-32 gap-4">
    <lobby
      v-for="lobby in lobbyStore.lobbies"
      :key="lobby.id"
      :lobby="lobby"
      @join-lobby="lobbyStore.joinLobby(lobby.id)"
      @start-game="lobbyStore.startLobby(lobby.id)"
    />

    <create-lobby-modal />
  </div>
</template>

<style scoped></style>
