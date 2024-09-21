<script setup lang="ts">
import { usePlayerStore } from '~/src/store/player.store'

const store = usePlayerStore()
</script>

<template>
  <button class='absolute bottom-3 right-3 px-3 py-2 bg-blue-600 text-white rounded-md'>
    Say UNO
  </button>
</template>

<style scoped></style>
