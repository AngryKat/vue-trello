<script lang="ts" setup>
import { Priority, TaskStatus, User, type Task } from '@/types'
import { computed, ref } from 'vue'

const { title, initialFormData } = defineProps<{
  title: string
  initialFormData: Task
}>()
const emit = defineEmits(['submit'])
const formData = ref<Task>(initialFormData)
const statusOptions = computed(() => {
  return Object.entries(TaskStatus).map(([value, title]) => ({
    title,
    value,
  }))
})
const userOptions = computed(() => {
  return User.map((user) => ({
    title: user,
    value: user,
  }))
})
const priorityOptions = computed(() => {
  return Object.entries(Priority).map(([value, title]) => ({
    title,
    value,
  }))
})
</script>
<template>
  <v-card class="card">
    <h3>{{ title }}</h3>
    <v-form @submit.prevent="emit('submit', formData)">
      <v-text-field label="Title" v-model="formData.title"></v-text-field>
      <v-autocomplete
        label="Status"
        :items="statusOptions"
        v-model="formData.status"
      ></v-autocomplete>
      <v-autocomplete
        label="Reporter"
        :items="userOptions"
        v-model="formData.reporter"
      ></v-autocomplete>
      <v-label>Assignees</v-label>
      <div class="checkboxContainer">
        <v-checkbox
          v-for="option in userOptions"
          v-model="formData.assignees"
          :label="option.title"
          :value="option.value"
        ></v-checkbox>
      </div>
      <v-autocomplete
        label="Priority"
        :items="priorityOptions"
        v-model="formData.priority"
        class="checkbox"
      ></v-autocomplete>
      <v-card-actions>
        <v-btn type="submit" variant="outlined">Save</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<style scoped>
.card {
  width: 400px;
  padding: 1.5rem;
  gap: 0.5em;
}
.checkboxContainer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
}
.checkbox {
  height: fit-content;
}
</style>
