<script setup lang='ts'>
import RequestColor from '~/src/components/player-interface/request-color.vue'
import SayUno from '~/src/components/player-interface/say-uno.vue'
import Hand from '~/src/components/player-interface/hand.vue'
import HandCompletedModal from '~/src/components/player-interface/hand-completed-modal.vue'
import GameCompletedModal from '~/src/components/player-interface/game-completed-modal.vue'
</script>

<template>
  <hand/>
  <say-uno/>
  <request-color/>
  <hand-completed-modal />
  <game-completed-modal />
</template>

<style scoped>

</style>