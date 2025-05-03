import Task, { TaskStatus } from "@/types/Task";
import { useDraggable, useDroppable } from "@dnd-kit/core";

interface Props {
  tasks: Task[];
  updateStatus: (id: string, status: TaskStatus) => void;
}

export default function Ongoing({ tasks, updateStatus }: Props) {
  const { setNodeRef: setDropRef } = useDroppable({ id: "ongoing" });

  return (
    <div className="bg-white p-4">
      <h2 className="text-xl font-bold mb-4 text-yellow-500">Ongoing Tasks</h2>
      <div ref={setDropRef} className="min-h-[100px] bg-yellow-50 p-2 rounded">
        {tasks.map((task) => {
          const { setNodeRef: setDragRef, listeners, attributes } = useDraggable({
            id: task.id,
          });

          return (
            <div
              key={task.id}
              ref={setDragRef}
              {...listeners}
              {...attributes}
              className="p-4 mb-2 border border-gray-300 bg-white shadow rounded cursor-grab"
            >
              <h3 className="font-bold">Title: {task.title}</h3>
              <p>Desc: {task.description}</p>
              <button
                onClick={() => updateStatus(task.id, "completed")}
                className="mt-2 bg-green-500 text-white py-1 px-3"
              >
                Move to Completed
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
