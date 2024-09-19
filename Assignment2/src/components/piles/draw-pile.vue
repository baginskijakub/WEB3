<script setup lang="ts">
import UnoCardReverse from '~/src/components/cards/uno-card/uno-card-reverse.vue'
import { usePlayerStore } from '~/src/store/player.store'
const store = usePlayerStore()
</script>

<template>
  <uno-card-reverse @click="store.drawCard()" />
</template>

<style scoped></style>
