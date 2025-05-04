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
      <div ref={setDropRef} className="min-h-[100px]">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks to display at the moment :(</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => {
              const {
                setNodeRef: setDragRef,
                listeners,
                attributes,
              } = useDraggable({
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
                </div>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
