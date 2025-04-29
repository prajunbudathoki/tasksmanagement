import Task from '@/types/Task';

interface Props {
  tasks: Task[]
}

export default function Completed({ tasks }: Props) {
  return (
    <div className="bg-white p-4">
      <h2 className="text-xl font-bold mb-4 text-green-500">Completed Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks to display at the moment :(</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task, idx) => (
            <li key={idx} className="p-4 border-b-1">
              <h3 className="font-bold text-xl">Title: {task.title}</h3>
              <p>Desc: {task.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}