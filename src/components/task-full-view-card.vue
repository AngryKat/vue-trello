<script lang="ts" setup>
import { useTasksStore } from '@/stores/tasks'
import { Priority, TaskStatus } from '@/types'
import { computed } from 'vue'

const { id } = defineProps<{ id: string }>()
const tasksStore = useTasksStore()
const emit = defineEmits(['click-close'])
const task = computed(() => tasksStore.tasks[id])
</script>
<template>
  <v-card class="card">
    <h3>{{ task.title }}</h3>
    <section>
      <h4>Status</h4>
      <p>{{ TaskStatus[task.status] }}</p>
    </section>
    <section>
      <h4>Reporter</h4>
      <p>{{ task.reporter }}</p>
    </section>
    <section>
      <h4>Assignees</h4>
      <div class="chipContainer">
        <v-chip class="chip" v-for="(assignee, index) in task.assignees" :key="index">{{
          assignee
        }}</v-chip>
      </div>
    </section>
    <section>
      <h4>Priority</h4>
      <p>{{ Priority[task.priority] }}</p>
    </section>
    <v-card-actions>
      <v-btn @click="$emit('click-close')">close</v-btn>
    </v-card-actions>
  </v-card>
</template>
<style scoped>
.card {
  width: 350px;
  padding: 1.5rem;
  gap: 0.5em;
}
.chip {
  margin-inline-end: 0.5em;
  margin-block-start: 0.5em;
}
</style>
