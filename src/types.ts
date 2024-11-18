export const User = ['admin', 'Sam', 'Miranda'] as const
export type User = (typeof User)[number]
export const Priority = Object.freeze({
  low: 'Low',
  medium: 'Medium',
  high: 'High',
} as const)
export type Priority = keyof typeof Priority

export const TaskStatus = Object.freeze({
  todo: 'TODO',
  inProgress: 'In progress',
  done: 'Done',
} as const)

export type TaskStatus = keyof typeof TaskStatus
export type Task = {
  id: string
  title: string
  status: TaskStatus
  reporter: User
  assignees: User[]
  priority: Priority
}
