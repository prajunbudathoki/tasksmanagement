import Task, { TaskStatus } from '@/types/Task';
// import { Pencil } from 'lucide-react'
import { useState } from 'react';

interface Props {
  tasks: Task[]
  updateStatus: (idx:string,status:TaskStatus) => void
  updateTask: (id: string,updatedTask: Task) => void
}

export default function Todo({ tasks, updateStatus,updateTask }: Props) {
  const [editingId,setEditingId]= useState(null)
  const [editedTask,setEditedTask] = useState<{title: string,description: string}>({
    title: '',
    description: ''
  })
  const handleEdit = (task: Task) => {
    setEditingId(task.id)
    setEditedTask({title: task.title,description: task.description})
  }
  const handleSave = (taskId: string) => {
    updateTask(taskId,editedTask)
    setEditingId(null)
  }
  return (
    <div className="bg-white p-4">
      <h2 className="text-xl font-bold mb-4 text-yellow-500">Ongoing Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks to display at the moment :(</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task, idx) => (
            <li key={idx} className="p-4 border-b-{'dashed'}">
              {editingId=== task.id ? (
                <div>
                  <input
                    type="text"
                    value={editedTask.title}
                    onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                    className="border p-2 w-full mb-2"
                  />
                  <textarea
                    value={editedTask.description}
                    onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                    className="border p-2 w-full mb-2"
                  />
                  <button
                    onClick={() => handleSave(task.id)}
                    className="bg-blue-500 text-white py-1 px-3 mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-500 text-white py-1 px-3"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="font-bold text-xl">Title: {task.title}</h3>
                  <p>Desc: {task.description}</p>
                  <button
                    onClick={() => handleEdit(task)}
                    className="mt-2 bg-yellow-500 text-white py-1 px-3 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => updateStatus(task.id, 'ongoing')}
                    className="mt-2 bg-yellow-500 text-white py-1 px-3"
                  >
                    Move to Ongoing
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}