import Task, { TaskStatus } from "@/types/Task";
import { useDroppable } from "@dnd-kit/core";
import DraggableTask from "./useDraggable";

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
            {tasks.map((task) => (
              <DraggableTask key={task.id} task={task} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}