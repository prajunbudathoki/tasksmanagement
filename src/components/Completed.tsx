import Task from "@/types/Task";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
// import { Trash2 } from "lucide-react";
import DraggableSortableTask from "./DraggableSortableTask";

interface Props {
  tasks: Task[];
  deleteTask: (id: string) => void;
}

export default function Completed({ tasks, deleteTask }: Props) {
  const { setNodeRef } = useDroppable({
    id: "completed",
  });

  return (
    <div className="bg-white" ref={setNodeRef}>
      <div className="bg-green-500 h-[60px]">
      <h2 className="text-xl font-bold mb-2 p-3 text-white">Completed Tasks</h2>
      </div>
      {/* <div>
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
      </div> */}
      <div className="p-4">
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.length === 0 ? (
          <div>
            <p className="text-gray-500">
              No tasks to display at the moment :(
            </p>
          </div>
        ) : (
          <ul>
            {tasks.map((task) => (
              <DraggableSortableTask key={task.id} task={task} />
            ))}
          </ul>
        )}
      </SortableContext>
      </div>
    </div>
  );
}
