<script setup lang='ts'>
import { useGameStore } from '~/src/store/game.store'
const store = useGameStore()

const displayModal = computed(() => store.game().winner() !== undefined)


const players = computed(() => {
  const players = store.game().players

  return players?.map((player, i) => {
    return {
      name: player,
      score: store.game().score(i)
    }
  })
})

</script>

<template>
  <span v-if="displayModal" class="absolute w-full h-full bg-slate-100 opacity-70 z-50" />

  <div
    v-if="displayModal"
    class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 p-4 bg-slate-100 flex flex-col justify-center items-center gap-2 z-50 rounded-md drop-shadow-2xl"
  >
    <h1 class='text-2xl'>Game completed!</h1>

    <div v-for='p in players'>
      <p>{{ p.name }}: {{ p.score }}</p>
    </div>

    <a href='/new-game' class='bg-blue-600 px-3 py-2 text-white rounded'>New game</a>
  </div>
</template>

<style scoped>

</style>