import { ref } from 'vue'
import { defineStore } from 'pinia'
import { TaskStatus, type Task } from '@/types'

export type Column = {
  id: TaskStatus
  title: string
  tasks: string[]
}


const tasks: Task[] = JSON.parse(sessionStorage.getItem('tasks') ?? '[]')
export const useColumnsStore = defineStore('columns', () => {
  console.log({ tasks })
  const columns = ref<Record<TaskStatus, Column>>({
    todo: {
      id: 'todo',
      title: TaskStatus.todo,
      tasks: tasks.filter(({ status }) => status === 'todo').map(({ id }) => id),
    },
    inProgress: {
      id: 'inProgress',
      title: TaskStatus.inProgress,
      tasks: tasks.filter(({ status }) => status === 'inProgress').map(({ id }) => id),
    },
    done: {
      id: 'done',
      title: TaskStatus.done,
      tasks: tasks.filter(({ status }) => status === 'done').map(({ id }) => id),
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
