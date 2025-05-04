import Task, { TaskStatus } from "@/types/Task";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import DraggableTask from "./useDraggable";

interface Props {
  tasks: Task[];
  updateStatus: (id: string, status: TaskStatus) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
}

export default function Todo({ tasks, updateStatus, updateTask }: Props) {
  const { setNodeRef: setDropRef } = useDroppable({ id: "todo" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTask, setEditedTask] = useState({ title: "", description: "" });

  const handleEdit = (task: Task) => {
    setEditingId(task.id);
    setEditedTask({ title: task.title, description: task.description });
  };

  const handleSave = (taskId: string) => {
    updateTask(taskId, editedTask);
    setEditingId(null);
  };

  return (
    <div className="bg-white p-4">
      <h2 className="text-xl font-bold mb-4 text-blue-500">Todo Tasks</h2>
      {/* <div ref={setDropRef} className="min-h-[100px]">
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
                  className="p-4 mb-2 border border-gray-300 bg-whitecursor-grab"
                >
                  {editingId === task.id ? (
                    <>
                      <input
                        className="w-full border p-1 mb-1"
                        value={editedTask.title}
                        onChange={(e) =>
                          setEditedTask({
                            ...editedTask,
                            title: e.target.value,
                          })
                        }
                      />
                      <textarea
                        className="w-full border p-1 mb-2"
                        value={editedTask.description}
                        onChange={(e) =>
                          setEditedTask({
                            ...editedTask,
                            description: e.target.value,
                          })
                        }
                      />
                      <button
                        onClick={() => handleSave(task.id)}
                        className="bg-green-400 text-white px-3 py-1 mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-300 text-black px-3 py-1"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="font-bold">Title: {task.title}</h3>
                      <p>Desc: {task.description}</p>
                      <button
                        onClick={() => handleEdit(task)}
                        className="bg-yellow-400 text-white px-3 py-1 mr-2"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </ul>
        )}
      </div> */}

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
