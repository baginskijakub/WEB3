<script setup lang="ts">
import { useUserStore } from '~/src/store/user.store'
import Bots from '~/src/components/bot-interface/bots.vue'
import RequestedColorIndicator from '~/src/components/requested-color/requested-color-indicator.vue'
import Piles from '~/src/components/piles/piles.vue'
import PlayerInterface from '~/src/components/player-interface/player-interface.vue'
import { useGameStore } from '~/src/store/game.store'

const route = useRoute()
const gameStore = useGameStore()
const userStore = useUserStore()

if (!userStore.user) {
  navigateTo('/login')
}

gameStore.initWs(parseInt(route.params.id))
</script>

<template>
  <div>
    <h1 v-if="!gameStore.game">Waiting for other players</h1>
    <div v-if="gameStore.game">
      <player-interface />
      <bots />
      <requested-color-indicator />
      <piles />
    </div>
  </div>
</template>

<style scoped></style>
