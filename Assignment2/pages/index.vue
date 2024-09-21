<script setup lang="ts">
import Layout from '~/src/components/layout/layout.vue'
import Bots from '~/src/components/bot-interface/bots.vue'
import Piles from '~/src/components/piles/piles.vue'
import RequestedColorIndicator from '~/src/components/requested-color/requested-color-indicator.vue'
import PlayerInterface from '~/src/components/player-interface/player-interface.vue'
</script>

<template>
  <layout>
    <player-interface />
    <bots />
    <requested-color-indicator />
    <piles />
  </layout>
</template>

<style scoped></style>
