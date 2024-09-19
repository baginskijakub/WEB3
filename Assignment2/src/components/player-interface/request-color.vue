<script setup lang="ts">
import { usePlayerStore } from '~/src/store/player.store'
import { COLOR_MAP } from '~/src/components/cards/uno-card/utils'

const store = usePlayerStore()
</script>

<template>
  <span v-if="store.displayRequestColorModal" class="absolute w-full h-full bg-slate-100 opacity-70 z-50" />

  <div
    v-if="store.displayRequestColorModal"
    class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-20 bg-slate-100 flex justify-center items-center gap-2 z-50 rounded-md drop-shadow-2xl"
  >
    Requested color:
    <div class="flex gap-2">
      <button class="w-5 h-5 rounded" :class="COLOR_MAP.RED" @click="store.playWildCard('RED')" />
      <button class="w-5 h-5 rounded" :class="COLOR_MAP.BLUE" @click="store.playWildCard('BLUE')" />
      <button class="w-5 h-5 rounded" :class="COLOR_MAP.GREEN" @click="store.playWildCard('GREEN')" />
      <button class="w-5 h-5 rounded" :class="COLOR_MAP.YELLOW" @click="store.playWildCard('YELLOW')" />
    </div>
  </div>
</template>

<style scoped></style>
