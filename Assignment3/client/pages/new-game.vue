<script setup lang="ts">
import NewGameModal from '~/src/components/new-game/new-game-modal.vue'
import { useUserStore } from '~/src/store/user.store'

const userStore = useUserStore()

if(!userStore.user) {
  navigateTo('/login')
}
</script>

<template>
  <new-game-modal />
</template>

<style scoped></style>
