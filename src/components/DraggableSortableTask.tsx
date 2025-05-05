import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Task from "@/types/Task";
import { SquarePen } from "lucide-react";
import { GripVertical } from "lucide-react";

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
    opacity: isDragging ? 0.5 : 3,
  };

  const isEditing = editingId === task.id;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      // {...listeners}
      style={style}
      className="group relative p-4 mb-2 border border-gray-300 bg-white shadow-sm rounded cursor-grab hover:border-blue-500 hover:shadow-md transition duration-200"
    >
      {/* grabing from the side point */}
      {/* <div
        {...listeners}
        className="absolute top-2 right-2 cursor-grab text-gray-500"
        title="Drag"
      >
        <GripVertical size={20} />
      </div> */}
      {isEditing ? (
        <div>
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
            className="bg-green-500 text-white px-3 py-1 mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setEditingId(null)}
            className="bg-gray-300 text-black px-3 py-1"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between w-full">
          <div {...listeners} className="w-full p-2">
            <h3 className="font-bold capitalize text-xl">{task.title}</h3>
            <p>{task.description}</p>
          </div>
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-500">
            <button onClick={() => handleEdit(task)} className="mt-2  ">
              <SquarePen />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
