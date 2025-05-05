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
  updateStatus: (id: string, status: TaskStatus) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
}

export default function Todo({ tasks, updateTask, updateStatus }: Props) {
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
    <div className="bg-white p-4 rounded" ref={setNodeRef}>
      <h2 className="text-xl font-bold text-blue-500 mb-2">Todo</h2>
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.length === 0 ? (
          <div>
            <p className="text-gray-500">No tasks to display at the moment :(</p>
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
  );
}
