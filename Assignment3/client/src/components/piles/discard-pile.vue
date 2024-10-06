<script setup lang="ts">
import { useGameStore } from '~/src/store/game.store'
import UnoCard from '../cards/uno-card/uno-card.vue'

const store = useGameStore()

const card = computed(() => {
  const cards = store.game?.currentHand?.discardPile.cards
  return cards ? cards[cards.length - 1] : null
})
</script>

<template>
  <div class="relative w-56 h-80">
    <uno-card v-if="card" :card="card" />
  </div>
</template>

<style scoped></style>
