import Task from "@/types/Task";
import { useDroppable } from "@dnd-kit/core";
import { Trash2 } from "lucide-react";

interface Props {
  tasks: Task[];
  deleteTask: (id:string) => void
}

export default function Completed({ tasks,deleteTask }: Props) {
  const { setNodeRef } = useDroppable({
    id: "completed",
  });

  return (
    <div className="bg-white p-4">
      <h2 className="text-xl font-bold mb-4 text-green-500">Completed Tasks</h2>
      <div ref={setNodeRef}>
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks to display at the moment :(</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="p-4 border border-gray-300 rounded bg-white shadow flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold text-xl">{task.title}</h3>
                  <p>{task.description}</p>
                </div>
                <button
                  className="text-red-500 cursor-pointer"
                  onClick={() => deleteTask(task.id)}
                >
                  <Trash2 />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}