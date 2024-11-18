import { ref } from 'vue'
import { defineStore } from 'pinia'
import { TaskStatus } from '@/types'

export type Column = {
  id: TaskStatus
  title: string
  tasks: string[]
}

export const useColumnsStore = defineStore('columns', () => {
  const columns = ref<Record<TaskStatus, Column>>({
    todo: {
      id: 'todo',
      title: TaskStatus.todo,
      tasks: ['dasff3vrw'],
    },
    inProgress: {
      id: 'inProgress',
      title: TaskStatus.inProgress,
      tasks: ['f2lgn23knf'],
    },
    done: {
      id: 'done',
      title: TaskStatus.done,
      tasks: ['f32gm2'],
    },
  })

  function addTask(column: TaskStatus, taskId: string) {
    columns.value[column].tasks.push(taskId)
  }
  function removeTask(column: TaskStatus, taskId: string) {
    const taskIdx = columns.value[column].tasks.indexOf(taskId)
    columns.value[column].tasks.splice(taskIdx, 1)
  }

  function changeStatus(taskId: string, oldStatus: TaskStatus, newStatus: TaskStatus) {
    const oldTaskIdx = columns.value[oldStatus].tasks.indexOf(taskId)
    columns.value[oldStatus].tasks.splice(oldTaskIdx, 1)
    columns.value[newStatus].tasks.push(taskId)
  }

  return { columns, addTask, removeTask, changeStatus }
})
