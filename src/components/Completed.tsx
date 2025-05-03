import Task from "@/types/Task";
import { useDroppable } from "@dnd-kit/core";

interface Props {
  tasks: Task[];
}

export default function Completed({ tasks }: Props) {
  const { setNodeRef } = useDroppable({
    id: "completed", // ✅ unique drop zone
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
                className="p-4 border border-gray-300 rounded bg-white shadow"
              >
                <h3 className="font-bold text-xl">Title: {task.title}</h3>
                <p>Desc: {task.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
