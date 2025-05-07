
export type TaskStatus = 'todo' | 'ongoing' | 'completed'

interface Task {
    id : string
    title: string
    description: string
    status: TaskStatus
    startDate?: Date | null
    dueDate?: Date | null
}

export default Task