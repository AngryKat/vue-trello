<script setup lang="ts">
import { computed, ref } from 'vue'
import TaskCard from './components/task-card.vue'
import { useColumnsStore } from './stores/columns'
import { useTasksStore } from './stores/tasks'
import draggable from 'vuedraggable'
import TaskForm from './components/task-form.vue'
import Column from './components/column.vue'
import TaskFullViewCard from './components/task-full-view-card.vue'
import type { Task, TaskStatus } from './types'

function getInitialFormData(): Task {
  return {
    title: 'New task',
    status: 'todo',
    id: '' + Math.random(),
    assignees: [],
    reporter: 'admin',
    priority: 'high',
  }
}
const modalVisible = ref(false)
const initialFormData = ref<Task>(getInitialFormData())
const editMode = ref(false)

const dragOptions = computed(() => {
  return {
    animation: 200,
    group: 'tasks',
    disabled: false,
    ghostClass: 'ghost',
    itemKey: 'self',
  }
})
const columnsStore = useColumnsStore()
const tasksStore = useTasksStore()
const modalTitle = computed(() => (editMode ? 'Add task' : 'Edit task'))
const viewTaskId = ref('')

function submit(formData: Task) {
  return function (handler: (formData: Task) => void) {
    handler(formData)
    modalVisible.value = false
  }
}

function clickAdd(columnId: TaskStatus) {
  initialFormData.value = { ...getInitialFormData(), status: columnId }
  editMode.value = false
  modalVisible.value = true
  viewTaskId.value = ''
}
function clickView(taskId: string) {
  viewTaskId.value = taskId
  modalVisible.value = true
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

type ActionButton = {
  icon: string
  ariaLabel: string
  click: () => void
}

function getTaskCardActionButtons(taskId: string): ActionButton[] {
  return [
    {
      icon: 'mdi-eye',
      ariaLabel: 'View',
      click: () => clickView(taskId),
    },
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
</script>

<template>
  <header>Trello Vue</header>
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
          </template> </draggable
      ></Column>
    </div>
    <v-dialog width="auto" v-model="modalVisible">
      <TaskFullViewCard v-if="!!viewTaskId" :id="viewTaskId" @click-close="viewTaskId = ''" />
      <TaskForm
        v-else
        :title="modalTitle"
        :initialFormData="initialFormData"
        @submit="(formData: Task) => submit(formData)(tasksStore[editMode ? 'edit' : 'add'])"
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
