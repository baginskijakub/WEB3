<script setup lang="ts">
import Layout from '~/src/components/layout/layout.vue'
import Hand from '~/src/components/player-interface/hand.vue'
import Bots from '~/src/components/bot-interface/bots.vue'
import Piles from '~/src/components/piles/piles.vue'
import RequestedColorIndicator from '~/src/components/requested-color/requested-color-indicator.vue'
import RequestColor from '~/src/components/player-interface/request-color.vue'
</script>

<template>
  <layout>
    <hand />
    <request-color />
    <bots />
    <requested-color-indicator />
    <piles />
  </layout>
</template>

<style scoped></style>
