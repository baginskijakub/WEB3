<script setup lang='ts'>
import type { Lobby } from '~/src/model/lobby'
import { useUserStore } from '~/src/store/user.store'

const userStore = useUserStore()
const props = defineProps<{
  lobby: Lobby
}>()

const emit = defineEmits(['join-lobby', 'start-game'])

const hasJoined = computed(() => {
  return userStore.user?.id === props.lobby.players.find(p => p.id === userStore.user?.id)?.id
})

const handleJoinLobby = () => {
  emit('join-lobby')
}

const handleStartGame = () => {
  emit('start-game')
}
</script>

<template>
  <div class='w-80 p-4 flex flex-col gap-2 bg-white rounded-lg'>
    <div class='flex justify-between'>
      <h5>{{props.lobby.name}}</h5>
      <p>{{props.lobby.players.length}}/4</p>
    </div>

    <div
      v-for="p in props.lobby.players"
      class="text-sm p-2 bg-slate-200 rounded-md flex justify-between items-center"
    >
      <label for="opponent">{{ p.name }}</label>
    </div>

    <button v-if='!hasJoined' class='px-2 py-1 bg-blue-700 text-white rounded-md w-full' @click='handleJoinLobby()'>Join</button>
    <button v-if='hasJoined && props.lobby.players.length > 1' class='px-2 py-1 bg-blue-700 text-white rounded-md w-full' @click='handleStartGame()'>Start game</button>
  </div>
</template>

<style scoped>

</style>