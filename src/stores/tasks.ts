import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useColumnsStore } from './columns'
import { User, type Task, type TaskStatus } from '@/types'

export const useTasksStore = defineStore('tasks', () => {
  const columnsStore = useColumnsStore()
  const tasks = ref<Record<string, Task>>({
    dasff3vrw: {
      id: 'dasff3vrw',
      title: 'TODO',
      status: 'todo',
      reporter: 'Miranda',
      assignees: ['Miranda'],
      priority: 'high'
    },
    f2lgn23knf: {
      id: 'f2lgn23knf',
      title: 'hello',
      status: 'inProgress',
      reporter: 'Miranda',
      assignees: ['Miranda'],
      priority: 'medium'

    },
    f32gm2: {
      id: 'f32gm2',
      title: 'Done',
      status: 'done',
      reporter: 'admin',
      assignees: ['Miranda', 'admin'],
      priority: 'low'

    },
  })

  function add(newTask: Task) {
    tasks.value[newTask.id] = { ...newTask }
    columnsStore.addTask(newTask.status, newTask.id)
  }
  function remove(taskId: string) {
    columnsStore.removeTask(tasks.value[taskId].status, taskId)
    delete tasks.value[taskId]
  }
  function changeStatus(taskId: string, newStatus: TaskStatus) {
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

  return { tasks, add, edit, remove, changeStatus }
})
