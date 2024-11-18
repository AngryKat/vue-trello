<script lang="ts" setup>
import { useTasksStore } from '@/stores/tasks'
import { computed } from 'vue'
import TaskFullViewCard from './task-full-view-card.vue'

export type ActionButton = {
  icon: string
  ariaLabel: string
  click: Function
}
const { id, actions } = defineProps<{
  id: string
  actions: ActionButton[]
}>()

const tasksStore = useTasksStore()
const task = computed(() => tasksStore.tasks[id])
</script>
<template>
  <v-card class="card">
    <h3>{{ task.title }}</h3>
    <div>
      <v-btn
        v-for="(action, index) in actions"
        :key="index"
        density="compact"
        :icon="action.icon"
        @click="action.click"
        :aria-label="action.ariaLabel"
        class="button"
        variant="plain"
      ></v-btn>
    </div>
  </v-card>
</template>
<style scoped>
.card {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  border-radius: 15px;
  margin-block-end: 0.5em;
}

h3 {
  font-weight: normal;
}
button {
  font-size: 0.75rem;
}
</style>
