import Task, { TaskStatus } from "@/types/Task";
import { useDroppable } from "@dnd-kit/core";
import DraggableTask from "./useDraggable";
import { useState } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableSortableTask from "./DraggableSortableTask";

interface Props {
  tasks: Task[];
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
}

export default function Ongoing({ tasks, updateTask }: Props) {
  const { setNodeRef } = useDroppable({ id: "ongoing" });
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
    <div className=" ongoing-container" ref={setNodeRef}>
      <div className="bg-yellow-500 h-[60px]">
        <h2 className="text-xl font-bold mb-2 p-3 text-white">Ongoing Tasks</h2>
        {/* <div className="min-h-[100px]">
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
      </div> */}
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
