<script setup lang="ts">
import { useUserStore } from '~/src/store/user.store'
import { LobbyService } from '~/src/services/lobby.service'
import { useAsyncData } from '#app'
import Lobby from '~/src/components/lobby/lobby.vue'

const userStore = useUserStore()

if(!userStore.user) {
  navigateTo('/login')
}

const {data} = useAsyncData(async () => await LobbyService.getAllLobbies())

const onJoinLobby = async (lobbyId: string) => {
  userStore.user && await LobbyService.joinLobby(userStore.user.id, lobbyId)
}

const onStartGame = async (lobbyId: string) => {
  // await LobbyService.startGame(lobbyId)
}

</script>

<template>
  <div class='w-full flex flex-col items-center mt-32 gap-4 overflow-scroll'>
    <lobby :lobby='lobby'  @join-lobby='onJoinLobby(lobby.id)' @start-game='onStartGame()' v-for='lobby in data' :key='lobby.id'></lobby>
  </div>


</template>

<style scoped></style>
