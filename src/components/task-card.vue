<script lang="ts" setup>
import { useTasksStore } from '@/stores/tasks'
import { Priority, TaskStatus, type ActionButton } from '@/types'
import { computed } from 'vue'

const { id, actions } = defineProps<{
  id: string
  actions: ActionButton[]
}>()

const tasksStore = useTasksStore()
const task = computed(() => tasksStore.tasks[id])
</script>
<template>
  <v-card class="card">
    <div style="display: flex; flex-direction: column-reverse">
      <h3>{{ task.title }}</h3>
      <div style="display: flex; justify-content: space-between">
        <p>{{ Priority[task.priority] }} priority</p>
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
      </div>
    </div>
    <div style="display: flex; justify-content: flex-end">
      <v-chip class="chip" v-for="assignee in task.assignees">{{ assignee }}</v-chip>
    </div>
  </v-card>
</template>
<style scoped>
.card {
  padding: 1rem;
  border-radius: 15px;
  margin-block-end: 0.5em;
}

.chip {
  margin-inline-start: 0.5em;
}

p {
  font-size: 14px;
}

h3 {
  font-weight: normal;
}
button {
  font-size: 0.75rem;
}
</style>
