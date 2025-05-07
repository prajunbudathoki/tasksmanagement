import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Task from "@/types/Task";
import DraggableSortableTask from "./DraggableSortableTask";
import { useState } from "react";
import { Plus } from "lucide-react";

interface Props {
  tasks: Task[];
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  addTask: (task: { title: string; description: string }) => void;
}

export default function Todo({ tasks, updateTask, addTask }: Props) {
  const { setNodeRef } = useDroppable({ id: "todo" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const handleEdit = (task: Task) => {
    setEditingId(task.id);
    setEditedTask({ title: task.title, description: task.description });
  };

  const handleSave = (taskId: string) => {
    updateTask(taskId, editedTask);
    setEditingId(null);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !newTask.description) return;
    addTask(newTask);
    setNewTask({ title: "", description: "" });
    setShowForm(false);
  };

  return (
    <div
      className="todo-container relative backdrop-blur-md bg-white/20 border border-white/30 rounded-xl shadow-lg"
      ref={setNodeRef}
    >
      <div className="flex items-center justify-between p-5">
        <h2 className="text-2xl font-bold text-white">Todo Tasks</h2>
        <button
          className="hover:scale-110 transition-transform"
          onClick={() => setShowForm(true)}
        >
          <Plus className="text-gray-800" />
        </button>
      </div>

      <div className="p-4">
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks to display at the moment :(</p>
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

      {showForm && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-md rounded-xl p-6 animate-fade-in z-10">
          <form onSubmit={handleAddTask} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="w-full border p-2 rounded-md text-lg"
            />
            <input
              type="text"
              name="description"
              placeholder="Task description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="w-full border p-2 rounded-md text-lg"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
