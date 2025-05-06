import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Task, { TaskStatus } from "@/types/Task";
import DraggableSortableTask from "./DraggableSortableTask";
import { useState } from "react";

interface Props {
  tasks: Task[];
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
}

export default function Todo({ tasks, updateTask }: Props) {
  const { setNodeRef } = useDroppable({ id: "todo" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTask, setEditedTask] = useState({ title: "", description: "" });

  const handleEdit = (tasks: Task) => {
    setEditingId(tasks.id);
    setEditedTask({ title: tasks.title, description: tasks.description });
  };

  const handleSave = (tasksId: string) => {
    updateTask(tasksId, editedTask);
    setEditingId(null);
  };

  return (
    <div className="bg-white rounded" ref={setNodeRef}>
      <div className="bg-blue-500 h-[60px]">
        <h2 className="text-xl p-3 font-bold text-white mb-2">Todo Tasks</h2>
      </div>
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
                <DraggableSortableTask
                  key={task.id}
                  task={task}
                  editingId={editingId}
                  editedTask={editedTask}
                  setEditingId={setEditingId}
                  setEditedTask={setEditedTask}
                  handleSave={handleSave}
                  handleEdit={handleEdit}
                />
              ))}
            </ul>
          )}
        </SortableContext>
      </div>
    </div>
  );
}
