import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Task from "@/types/Task";

interface Props {
  task: Task;
  editingId: string | null;
  editedTask: { title: string; description: string };
  setEditingId: (id: string | null) => void;
  setEditedTask: (task: { title: string; description: string }) => void;
  handleSave: (id: string) => void;
  handleEdit: (task: Task) => void;
}

export default function DraggableSortableTask({
  task,
  editingId,
  editedTask,
  setEditingId,
  setEditedTask,
  handleSave,
  handleEdit,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isEditing = editingId === task.id;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="p-4 mb-2 border border-gray-300 bg-white shadow-sm rounded cursor-grab"
    >
      {isEditing ? (
        <>
          <input
            className="w-full border p-1 mb-1"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
          />
          <textarea
            className="w-full border p-1 mb-2"
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
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
            className="bg-yellow-400 text-white px-3 py-1 mt-2"
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
}

