import Task, { TaskStatus } from '@/types/Task';
import { Pencil } from 'lucide-react';

interface Props {
  tasks: Task[]
  updateStatus: (idx:string,status:TaskStatus) => void
}

export default function Ongoing({ tasks, updateStatus }: Props) {
  return (
    <div className="bg-white p-4">
      <h2 className="text-xl font-bold mb-4 text-yellow-500">Ongoing Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks to display at the moment :(</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task, idx) => (
            <li key={idx} className="p-4 border-b-{'dashed'}">
              <h3 className="font-bold text-xl">Title: {task.title}</h3>
              <p>Desc: {task.description}</p>
              <button
                onClick={() => updateStatus(task.id, 'completed')}
                className="mt-2 bg-green-500 text-white py-1 px-3 cursor-pointer"
              >
                Move to Completed
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}