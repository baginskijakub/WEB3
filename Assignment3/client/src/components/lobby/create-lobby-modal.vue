<script setup lang="ts">
import { ref } from 'vue'
import { useLobbyStore } from '~/src/store/lobby.store'

const store = useLobbyStore()

const isModalOpen = ref(false)
const lobbyName = ref('')

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  lobbyName.value = ''
}

const onCreateLobby = () => {
  if (lobbyName.value.trim()) {
    store.createLobby(lobbyName.value)
    closeModal()
  } else {
    alert('Please enter a valid lobby name.')
  }
}
</script>

<template>
  <button @click="openModal" class="px-3 py-2 bg-blue-700 text-white rounded-md">Create Lobby</button>

  <div
    v-if="isModalOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="closeModal"
  >
    <div class="bg-white w-80 p-4 flex flex-col gap-6 shadow-lg rounded-xl">
      <h1>Create Lobby</h1>

      <div class="flex flex-col gap-2">
        <label for="lobby-name">Lobby Name</label>
        <input
          v-model="lobbyName"
          type="text"
          id="lobby-name"
          class="text-sm p-2 bg-slate-200 rounded-md"
          placeholder="Enter lobby name"
        />
      </div>

      <div class="flex justify-between">
        <button @click="closeModal" class="px-3 py-2 bg-gray-300 text-black rounded-md">Cancel</button>
        <button @click="onCreateLobby" class="px-3 py-2 bg-blue-700 text-white rounded-md">Create</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
