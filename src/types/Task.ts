
export type TaskStatus = 'todo' | 'ongoing' | 'completed'

interface Task {
    id : string
    title: string
    description: string
    status: TaskStatus
}

export default Task