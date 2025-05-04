import Task, { TaskStatus } from "@/types/Task";
import { useDroppable } from "@dnd-kit/core";
import DraggableTask from "./useDraggable";
import { useState } from "react";

interface Props {
  tasks: Task[];
  updateStatus: (id: string, status: TaskStatus) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
}

export default function Ongoing({ tasks, updateStatus, updateTask }: Props) {
  const { setNodeRef: setDropRef } = useDroppable({ id: "ongoing" });
  // const { transform, transition } = useSortable({ id: "ongoing" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTask, setEditedTask] = useState({ title: "", description: "" });

  const handleEdit = (task: Task) => {
    // console.log("editing task: ",task)
    setEditingId(task.id);
    setEditedTask({ title: task.title, description: task.description });
  };

  const handleSave = (taskId: string) => {
    console.log("saving button", taskId);
    updateTask(taskId, editedTask);
    setEditingId(null);
  };

  return (
    <div className="bg-white p-4">
      <h2 className="text-xl font-bold mb-4 text-yellow-500">Ongoing Tasks</h2>
      <div ref={setDropRef} className="min-h-[100px]">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks to display at the moment :(</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <DraggableTask
                key={task.id}
                task={task}
                editingId={editingId}
                editedTask={editedTask}
                setEditedTask={setEditedTask}
                setEditingId={setEditingId}
                handleSave={handleSave}
                handleEdit={handleEdit}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
