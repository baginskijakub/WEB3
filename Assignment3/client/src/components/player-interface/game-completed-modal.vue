<script setup lang="ts">
import { useGameStore } from '~/src/store/game.store'
const store = useGameStore()

const players = computed(() => {
  const players = store.game?.players

  return players?.map((player, i) => {
    return {
      name: player,
      score: store.game?.playerScores[i],
    }
  })
})
</script>

<template>
  <span v-if="store.displayGameOverModal" class="absolute w-full h-full bg-slate-100 opacity-70 z-50" />

  <div
    v-if="store.displayGameOverModal"
    class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 p-4 bg-slate-100 flex flex-col justify-center items-center gap-2 z-50 rounded-md drop-shadow-2xl"
  >
    <h1 class="text-2xl">Game completed!</h1>

    <div v-for="p in players">
      <p>{{ p.name }}: {{ p.score }}</p>
    </div>

    <a href="/lobbies" class="bg-blue-600 px-3 py-2 text-white rounded">New game</a>
  </div>
</template>

<style scoped></style>
