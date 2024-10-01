<script setup lang='ts'>
import { ref } from 'vue';
import {useUserStore} from '~/src/store/user.store';

const userStore = useUserStore();

const email = ref('');
const password = ref('');

const handleSubmit = () => {
  userStore.login(email.value, password.value).then(() => {
    navigateTo('/new-game');
  });
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none"
        >
          Login
        </button>
      </form>
      <a href="/register" class="block text-center mt-4 text-sm text-indigo-600 hover:text-indigo-500">Don't have an account? Register</a>
    </div>
  </div>
</template>