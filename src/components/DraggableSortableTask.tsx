import Task from "@/types/Task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SquarePen, Trash2, EllipsisVertical } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  task: Task;
  editingId?: string | null;
  editedTask?: { title: string; description: string };
  setEditingId?: (id: string | null) => void;
  setEditedTask?: (task: { title: string; description: string }) => void;
  handleSave?: (id: string) => void;
  handleEdit?: (task: Task) => void;
  handleDelete?: (id: string) => void;
}

export default function DraggableSortableTask({
  task,
  editingId,
  editedTask,
  setEditingId,
  setEditedTask,
  handleSave,
  handleEdit,
  handleDelete,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const [menuOpen, setMenuOpen] = useState(false);

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
      style={style}
      className="group relative p-4 mb-2 border border-gray-300 bg-white shadow-sm rounded cursor-grab hover:border-blue-500 hover:shadow-md transition duration-200"
    >
      {isEditing && editedTask ? (
        <div>
          <input
            className="w-full border p-1 mb-1"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask?.({ ...editedTask, title: e.target.value })
            }
          />
          <textarea
            className="w-full border p-1 mb-2"
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask?.({ ...editedTask, description: e.target.value })
            }
          />
          <button
            onClick={() => handleSave?.(task.id)}
            className="bg-green-500 text-white px-3 py-1 mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setEditingId?.(null)}
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
          <div className="relative">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="text-gray-500"
            >
              <EllipsisVertical />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 shadow-lg rounded">
                <button
                  onClick={() => {
                    handleEdit?.(task);
                    setMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <SquarePen className="mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    handleDelete?.(task.id);
                    setMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <Trash2 className="mr-2" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
