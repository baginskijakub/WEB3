<script setup lang='ts'>
import { useGameStore } from '~/src/store/game.store'

const displayModal = ref(false)

const store = useGameStore()

store.game().onHandEnd(() => {
  if (store.game().winner() === undefined) {
    displayModal.value = true
  }
})

const players = computed(() => {
  const players = store.game().currentHand()?.players

  return players?.map((player, i) => {
    return {
      name: player.name,
      score: store.game().score(i)
    }
  })
})

const onContinue = () => {
  displayModal.value = false
}

</script>

<template>
  <span v-if="displayModal" class="absolute w-full h-full bg-slate-100 opacity-70 z-50" />

  <div
    v-if="displayModal"
    class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 p-4 bg-slate-100 flex flex-col justify-center items-center gap-2 z-50 rounded-md drop-shadow-2xl"
  >
    <div v-for='p in players'>
      <p>{{ p.name }}: {{ p.score }}</p>
    </div>

    <button @click='onContinue()' class='bg-blue-600 px-3 py-2 text-white rounded'>Continue</button>
  </div>
</template>

<style scoped>

</style>