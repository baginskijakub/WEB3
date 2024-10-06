<script setup lang="ts">
import { useGameStore } from '~/src/store/game.store'
import { UserRound, TriangleAlert } from 'lucide-vue-next'

const props = defineProps<{
  playerIndex: number
  position: 'left' | 'top' | 'right'
}>()

const store = useGameStore()

const player = computed(() => {
  const players = store.game?.currentHand?.players

  const player = players ? players[props.playerIndex] : null

  if (!player) {
    return { name: '', numberOfCards: 0 }
  }

  const name = players ? players[props.playerIndex].name : ''
  const numberOfCards = players ? players[props.playerIndex].hand.length : 0

  return { name, numberOfCards }
})

const hasSaidUno = computed(() => {
  return useGameStore().game?.currentHand?.players[props.playerIndex].saidUno
})
</script>

<template>
  <div
    v-if="position === 'left'"
    class="flex flex-col justify-center items-center absolute bg-gray-800 text-white left-0 top-1/2 transform -translate-y-1/2 rounded-r"
  >
    <div class="p-3 flex flex-col justify-center items-center gap-1/2">
      <UserRound :size="20" />
      <p class="text-sm">{{ player.name }}</p>
    </div>
    <div class="p-3 flex flex-col justify-center items-center gap-1/2">
      <img src="/cards-icon.svg" alt="cards icon" class="w-5 h-5" />
      <p class="text-sm">{{ player.numberOfCards }}</p>
    </div>

    <button
      class="bg-red-700 m-3 w-9 h-9 flex items-center justify-center rounded hover:opacity-70 ease-in-out duration-200"
      @click="store.accuseOfNotSayingUno(0, props.playerIndex)"
    >
      <TriangleAlert :size="20" />
    </button>
    <div v-if="hasSaidUno" class="w-12 h-9 bg-yellow-600 m-3 rounded flex justify-center items-center text-sm">
      UNO!
    </div>
  </div>

  <div
    v-if="position === 'top'"
    class="flex justify-center items-center absolute bg-gray-800 text-white top-0 left-1/2 transform -translate-x-1/2 rounded-b"
  >
    <div class="p-3 flex flex-col justify-center items-center gap-1/2">
      <UserRound :size="20" />
      <p class="text-sm">{{ player.name }}</p>
    </div>
    <div class="p-3 flex flex-col justify-center items-center gap-1/2">
      <img src="/cards-icon.svg" alt="cards icon" class="w-5 h-5" />
      <p class="text-sm">{{ player.numberOfCards }}</p>
    </div>
    <button
      class="bg-red-700 m-3 w-9 h-9 flex items-center justify-center rounded hover:opacity-70 ease-in-out duration-200"
      @click="store.accuseOfNotSayingUno(0, props.playerIndex)"
    >
      <TriangleAlert :size="20" />
    </button>
    <div v-if="hasSaidUno" class="w-12 h-9 bg-yellow-600 m-3 rounded flex justify-center items-center text-sm">
      UNO!
    </div>
  </div>

  <div
    v-if="position === 'right'"
    class="flex flex-col justify-center items-center absolute bg-gray-800 text-white right-0 top-1/2 transform -translate-y-1/2 rounded-l"
  >
    <div class="p-3 flex flex-col justify-center items-center gap-1/2">
      <UserRound :size="20" />
      <p class="text-sm">{{ player.name }}</p>
    </div>
    <div class="p-3 flex flex-col justify-center items-center gap-1/2">
      <img src="/cards-icon.svg" alt="cards icon" class="w-5 h-5" />
      <p class="text-sm">{{ player.numberOfCards }}</p>
    </div>
    <button
      class="bg-red-700 m-3 w-9 h-9 flex items-center justify-center rounded hover:opacity-70 ease-in-out duration-200"
      @click="store.accuseOfNotSayingUno(0, props.playerIndex)"
    >
      <TriangleAlert :size="20" />
    </button>
    <div v-if="hasSaidUno" class="w-12 h-9 bg-yellow-600 m-3 rounded flex justify-center items-center text-sm">
      UNO!
    </div>
  </div>
</template>

<style scoped></style>
