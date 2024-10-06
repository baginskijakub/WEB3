<script setup lang="ts">
import { useGameStore } from '~/src/store/game.store'
import BotInterface from './bot-interface.vue'
import { POSITIONS_ARRAY } from '~/src/components/bot-interface/utils'
import { useUserStore } from '~/src/store/user.store'
const userStore = useUserStore()
const gameStore = useGameStore()

const players = computed(() => {
  const userName = userStore.user?.name
  return gameStore.game?.players.filter((player) => player !== userName)
})
</script>

<template>
  <bot-interface
    v-for="(_, index) in players"
    :key="`${index}-bot`"
    :player-index="index"
    :position="POSITIONS_ARRAY[players.length - 1][index]"
  />
</template>

<style scoped></style>
