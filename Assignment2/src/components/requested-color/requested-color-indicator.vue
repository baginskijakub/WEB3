<script setup lang="ts">
import { useGameStore } from '~/src/store/game.store'
import { COLOR_MAP } from '~/src/components/cards/uno-card/utils'

const store = useGameStore()

const requestedColor = computed(() => {
  const hand = store.game().currentHand()
  return hand?.requestedColor
})
</script>

<template>
  <div
    v-if="requestedColor"
    class="absolute top-[15%] left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-2"
  >
    <p>Requested color:</p>
    <div class="w-6 h-6 rounded" :class="COLOR_MAP[requestedColor]" />
  </div>
</template>

<style scoped></style>
