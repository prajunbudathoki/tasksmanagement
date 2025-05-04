import { useDraggable } from "@dnd-kit/core";
import Task from "@/types/Task";

interface Props {
  task: Task
  editingId: string | null
  editedTask: { title: string; description: string }
  setEditedTask: (task: { title: string; description: string }) => void
  setEditingId: (id: string | null) => void
  handleSave: (taskId: string) => void
  handleEdit: (task: Task) => void
}

export default function DraggableTask({
  task,
  editingId,
  editedTask,
  setEditedTask,
  setEditingId,
  handleSave,
  handleEdit,
}: Props) {
  const { setNodeRef, listeners, attributes } = useDraggable({
    id: task.id,
  });

  return (
    <div
      key={task.id}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-4 mb-2 border border-gray-300 bg-white cursor-grab"
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
          <h3 className="font-bold text-2xl capitalize">{task.title}</h3>
          <p>{task.description}</p>
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
}