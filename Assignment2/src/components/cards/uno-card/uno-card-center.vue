<script setup lang="ts">
import type { Card } from '~/src/model/deck'

const { card } = defineProps<{ card: Card }>()

const color = card.color
</script>

<template>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <p
      v-if="card.number !== undefined"
      class="text-white font-semibold text-8xl italic [text-shadow:_0_5px_0_rgb(0_0_0_/_100%)]"
    >
      {{ card.number }}
    </p>

    <svg
      v-if="card.type === 'SKIP'"
      class="w-24 h-24 drop-shadow-card-icon"
      viewBox="0 0 162 162"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M81 162C125.735 162 162 125.735 162 81C162 36.2649 125.735 0 81 0C36.2649 0 0 36.2649 0 81C0 125.735 36.2649 162 81 162ZM31.7794 117.786C24.1025 107.53 19.5558 94.796 19.5558 81C19.5558 47.0653 47.0653 19.5558 81 19.5558C94.7961 19.5558 107.53 24.1025 117.786 31.7794L31.7794 117.786ZM45.3701 131.065C55.4196 138.23 67.7176 142.444 81 142.444C114.935 142.444 142.444 114.935 142.444 81C142.444 67.7175 138.23 55.4196 131.065 45.3701L45.3701 131.065Z"
        fill="white"
      />
    </svg>

    <svg
      v-if="card.type === 'REVERSE'"
      class="w-26 h-28 drop-shadow-card-icon"
      viewBox="0 0 137 191"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M117.039 72.2248L136.392 0L64.1671 19.3526L80.861 36.0464L35.7217 81.1856C24.602 92.3053 24.602 110.334 35.7217 121.454L100.995 56.1804L117.039 72.2248Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M55.5309 154.902L72.2248 171.596L0 190.949L19.3526 118.724L35.3969 134.768L100.67 69.4949C111.79 80.6146 111.79 98.6432 100.67 109.763L55.5309 154.902Z"
        fill="white"
      />
    </svg>

    <p
      v-if="card.type === 'DRAW'"
      class="text-white font-semibold text-7xl italic [text-shadow:_0_4px_0_rgb(0_0_0_/_100%)] -translate-x-3"
    >
      +2
    </p>

    <svg
      v-if="card.type === 'WILD' || card.type === 'WILD DRAW'"
      class="w-10 h-12 scale-[5.5] -translate-x-1"
      viewBox="0 0 204 232"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_6497_1720"
        style="mask-type: alpha"
        maskUnits="userSpaceOnUse"
        x="29"
        y="24"
        width="165"
        height="204"
      >
        <ellipse cx="101.68" cy="115.945" rx="62.5" ry="98" transform="rotate(28.4919 101.68 115.945)" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_6497_1720)">
        <rect x="10" y="65.3346" width="102" height="102" transform="rotate(30 10 65.3346)" fill="#EFBD37" />
        <rect x="61" y="-23" width="102" height="102" transform="rotate(30 61 -23)" fill="#EC2D2D" />
        <rect x="98.3346" y="116.335" width="102" height="102" transform="rotate(30 98.3346 116.335)" fill="#3CBF49" />
        <rect x="149.335" y="28" width="102" height="102" transform="rotate(30 149.335 28)" fill="#396FF2" />
      </g>
      <path
        d="M52.3067 206.91C69.6961 216.348 90.747 213.477 110.129 202.742C129.578 191.971 148.111 172.947 161.444 148.384C174.776 123.82 180.629 97.9139 179.064 75.7368C177.505 53.6352 168.442 34.4193 151.053 24.9808C133.663 15.5423 112.612 18.4133 93.2301 29.1483C73.7816 39.92 55.248 58.9433 41.9156 83.507C28.5831 108.071 22.7302 133.977 24.295 156.154C25.8544 178.256 34.9172 197.471 52.3067 206.91Z"
        stroke="white"
        stroke-width="11"
      />
    </svg>
  </div>
</template>
