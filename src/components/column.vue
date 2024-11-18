<script lang="ts" setup>
import type { Column } from '@/stores/columns'
const { column } = defineProps<{ column: Column }>()
const emit = defineEmits(['click-add'])
</script>
<template>
  <div class="column">
    <h2>{{ column.title }}</h2>
    <slot></slot>
    <v-btn @click="$emit('click-add', column.id)" variant="plain"
      ><v-icon icon="mdi-plus"></v-icon>Add a card</v-btn
    >
  </div>
</template>
<style scoped>
h2 {
  font-size: 18px;
  margin-block-end: 1em;
  padding-block-start: 0.5em;
  padding-left: 0.75em;
}
.column {
  background-color: #ebebeb;
  border-radius: 15px;
  padding: 1rem;
  height: fit-content;
}
</style>
