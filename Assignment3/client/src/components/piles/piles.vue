<script setup lang="ts">
import DiscardPile from '~/src/components/piles/discard-pile.vue'
import DrawPile from '~/src/components/piles/draw-pile.vue'
</script>

<template>
  <div class="absolute left-1/2 top-1/2 transition -translate-x-1/2 -translate-y-1/2 flex gap-12 pb-28">
    <draw-pile />
    <discard-pile />
  </div>
</template>

<style scoped></style>
