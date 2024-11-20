<script setup lang="ts">
import { computed, ref } from 'vue'
import TaskCard from './components/task-card.vue'
import { useColumnsStore } from './stores/columns'
import { useTasksStore } from './stores/tasks'
import draggable from 'vuedraggable'
import TaskForm from './components/task-form.vue'
import Column from './components/column.vue'
import type { ActionButton, Task, TaskStatus } from './types'

function getTaskCardActionButtons(taskId: string): ActionButton[] {
  return [
    {
      icon: 'mdi-pencil',
      ariaLabel: 'Edit',
      click: () => clickEdit(taskId),
    },
    {
      icon: 'mdi-delete-outline',
      ariaLabel: 'Remove',
      click: () => clickRemove(taskId),
    },
  ]
}

function getInitialFormData(): Task {
  return {
    title: '',
    status: 'todo',
    id: '' + Math.random(),
    assignees: [],
    reporter: 'admin',
    priority: 'high',
  }
}

const columnsStore = useColumnsStore()
const tasksStore = useTasksStore()

const modalVisible = ref(false)
const initialFormData = ref<Task>(getInitialFormData())
const editMode = ref(false)
const viewTaskId = ref('')

const dragOptions = computed(() => {
  return {
    animation: 200,
    group: 'tasks',
    disabled: false,
    ghostClass: 'ghost',
    itemKey: 'self',
  }
})

function submit(formData: Task) {
  const handler = tasksStore[editMode.value ? 'edit' : 'add']
  handler(formData)
  modalVisible.value = false
}

function clickAdd(columnId: TaskStatus) {
  initialFormData.value = { ...getInitialFormData(), status: columnId }
  editMode.value = false
  modalVisible.value = true
  viewTaskId.value = ''
}

function clickEdit(taskId: string) {
  initialFormData.value = { ...tasksStore.tasks[taskId] }
  editMode.value = true
  modalVisible.value = true
  viewTaskId.value = ''
}
function clickRemove(taskId: string) {
  tasksStore.remove(taskId)
}

console.log({ c: columnsStore.columns })
</script>

<template>
  <main>
    <div class="wrapper">
      <Column
        :column="column"
        @click-add="clickAdd"
        v-for="column in columnsStore.columns"
        :key="column.id"
      >
        <draggable
          v-bind="dragOptions"
          v-model="column.tasks"
          @change="
            (evt) => {
              if (evt.added) {
                tasksStore.changeStatus(evt.added.element, column.id)
              }
            }
          "
        >
          <template #item="{ element: taskId }">
            <TaskCard :id="taskId" :actions="getTaskCardActionButtons(taskId)" />
          </template>
        </draggable>
      </Column>
    </div>
    <v-dialog width="auto" v-model="modalVisible">
      <TaskForm
        :initialFormData="initialFormData"
        @submit="(formData: Task) => submit(formData)"
        @cancel="modalVisible = false"
      />
    </v-dialog>
  </main>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
}
</style>
