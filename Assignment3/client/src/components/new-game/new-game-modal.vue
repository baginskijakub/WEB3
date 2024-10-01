<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { useGameStore } from '~/src/store/game.store'
const OPPONENTS = ['You', 'Bob', 'Alice', 'Charlie']
const store = useGameStore()

const opponents = ref(2)

const onAddPlayer = () => {
  opponents.value < OPPONENTS.length + 1 && opponents.value++
}

const onRemovePlayer = () => {
  opponents.value > 2 && opponents.value--
}

const onNewGame = () => {
  const players = OPPONENTS.slice(0, opponents.value)

  store.initGame({ players })
  navigateTo('/')
}
</script>

<template>
  <div
    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-80 p-4 flex flex-col gap-6 shadow-lg rounded-xl"
  >
    <h1>New Game</h1>

    <div class="flex flex-col gap-2">
      Players
      <div
        v-for="o in OPPONENTS.slice(0, opponents)"
        class="text-sm p-2 bg-slate-200 rounded-md flex justify-between items-center"
      >
        <label for="opponent">{{ o }}</label>
        <X v-if="opponents > 2 && o !== 'You'" :size="20" @click="onRemovePlayer" class="cursor-pointer" />
      </div>
      <button v-if="opponents < 4" @click="onAddPlayer" class="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-md">
        Add player
      </button>
    </div>

    <button @click="onNewGame" class="px-3 py-2 bg-blue-700 text-white rounded-md">Start game</button>
  </div>
</template>

<style scoped></style>
