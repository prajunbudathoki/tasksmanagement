import { useSortable } from "@dnd-kit/sortable";
import Task from "@/types/Task";
import { SquarePen } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
  editingId: string | null;
  editedTask: { title: string; description: string };
  setEditedTask: (task: { title: string; description: string }) => void;
  setEditingId: (id: string | null) => void;
  handleSave: (taskId: string) => void;
  handleEdit: (task: Task) => void;
}

export default function SortableTask({
  task,
  editingId,
  editedTask,
  setEditedTask,
  setEditingId,
  handleSave,
  handleEdit,
}: Props) {
  const {transform,transition,attributes,listeners,setNodeRef} = useSortable({id:task.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }
  return(
    <div
      key={task.id}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="mb-2 border border-gray-300 bg-white cursor-grab flex items-center justify-between"
    >
      {editingId === task.id ? (
        <>
          <div className="flex-1">
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
          </div>
          <div>
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
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between w-full">
          <div className="w-full p-4">
            <h3 className="font-bold text-2xl capitalize">{task.title}</h3>
            <p>{task.description}</p>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleEdit(task);
            }}
            className="text-gray-500 cursor-pointer"
          >
            <SquarePen />
          </button>
        </div>
      )}
    </div>
  )
}
