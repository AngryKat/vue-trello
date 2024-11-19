import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useColumnsStore } from './columns'
import { User, type Task, type TaskStatus } from '@/types'

export const useTasksStore = defineStore('tasks', () => {
  const columnsStore = useColumnsStore()
  const tasks = ref<Record<string, Task>>(
    JSON.parse(sessionStorage.getItem('tasks') ?? '[]').reduce(
      (acc: Record<string, Task>, curr: Task) => {
        acc[curr.id] = { ...curr }
        return acc
      },
      {},
    ),
  )

  function updateStorage() {
    sessionStorage.setItem('tasks', JSON.stringify(Object.values(tasks.value)))
  }

  function add(newTask: Task) {
    tasks.value[newTask.id] = { ...newTask }
    columnsStore.addTask(newTask.status, newTask.id)
  }
  function remove(taskId: string) {
    columnsStore.removeTask(tasks.value[taskId].status, taskId)
    delete tasks.value[taskId]
  }
  function changeStatus(taskId: string, newStatus: TaskStatus) {
    console.log({ newStatus })
    const oldTask = tasks.value[taskId]
    if (oldTask.status === newStatus) return
    tasks.value[taskId].status = newStatus
  }
  function edit(newTask: Task) {
    console.log('edit')
    const oldTask = tasks.value[newTask.id]
    if (oldTask.status !== newTask.status) {
      columnsStore.changeStatus(newTask.id, oldTask.status, newTask.status)
    }
    tasks.value[newTask.id] = { ...newTask }
  }

  watch(tasks, () => updateStorage())

  return { tasks, add, edit, remove, changeStatus }
})
