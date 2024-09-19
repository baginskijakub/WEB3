<script setup lang="ts">
import type { Card } from '~/src/model/deck'
import UnoCardCorner from '~/src/components/cards/uno-card/uno-card-corner.vue'
import { mapCardToStyle } from '~/src/components/cards/uno-card/utils'
import UnoCardCenter from '~/src/components/cards/uno-card/uno-card-center.vue'

const props = defineProps<{ card: Card }>()

const styles = computed(() => mapCardToStyle(props.card))
</script>

<template>
  <div class="w-56 h-80 border-[12px] shadow-lg border-white rounded-lg relative" :class="styles.color">
    <uno-card-corner :card="props.card" />
    <span
      v-if="props.card.type !== 'WILD' && props.card.type !== 'WILD DRAW'"
      class="h-40 w-60 border-8 border-white rounded-[50%] -rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    />
    <uno-card-center :card="props.card" />
    <div class="absolute bottom-0 right-0 rotate-180">
      <uno-card-corner :card="props.card" />
    </div>
  </div>
</template>
