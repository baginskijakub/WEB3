<script setup lang="ts">
import { usePlayerStore } from '~/src/store/player.store'
import UnoCard from '~/src/components/cards/uno-card/uno-card.vue'

const store = usePlayerStore()
</script>

<template>
  <div
    class="absolute -bottom-40 left-1/2 -translate-x-1/2 flex -space-x-32"
    :class="!store.isPlayerInTurn && 'opacity-70'"
  >
    <uno-card
      v-for="(card, i) in store.playerCards"
      :key="i"
      :card="card"
      class="cursor-pointer transform hover:-translate-y-12 shadow-lg transition-all duration-200 ease-in-out"
      @click="store.playCard(i)"
    />
  </div>
</template>

<style scoped></style>
