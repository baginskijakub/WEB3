<script setup lang="ts">
import { useGameStore } from '~/src/store/game.store'
import UnoCard from '../cards/uno-card/uno-card.vue'

const store = useGameStore()

const discardPile = computed(() => store.game().currentHand()?.discardPile.cards)
</script>

<template>
  <div class="relative w-56 h-80">
    <div class="absolute top-0 left-0" v-for="(card, i) in discardPile" :key="i">
      <uno-card :card="card" :class="`z-[${i}]`" />
    </div>
  </div>
</template>

<style scoped></style>
