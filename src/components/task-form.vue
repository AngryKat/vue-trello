<script lang="ts" setup>
import { Priority, TaskStatus, User, type Task } from '@/types'
import { computed, ref } from 'vue'

const { initialFormData } = defineProps<{
  initialFormData: Task
}>()
const emit = defineEmits<{
  (e: 'submit', formData: Task): void
  (e: 'cancel'): void
}>()
const formData = ref<Task>(initialFormData)
const formRef = ref()
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

async function submit() {
  const { valid } = await formRef.value.validate()
  if (!valid) return
  emit('submit', formData.value)
}
</script>
<template>
  <v-card class="card">
    <v-form ref="formRef" @submit.prevent="submit">
      <v-text-field
        autofocus
        label="Title"
        v-model="formData.title"
        :rules="[(v) => !!v || 'Title is required']"
      ></v-text-field>
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
        <v-btn type="button" @click="$emit('cancel')">Cancel</v-btn>
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
