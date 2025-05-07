import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  SquarePen,
  Trash2,
  EllipsisVertical,
  Menu as MenuIcon,
  Calendar as CalendarIcon,
} from "lucide-react";
import Task from "@/types/Task";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useDroppable } from "@dnd-kit/core";

interface Props {
  task: Task;
  editingId?: string | null;
  editedTask?: { title: string; description: string };
  setEditingId?: (id: string | null) => void;
  setEditedTask?: (task: { title: string; description: string }) => void;
  handleSave?: (id: string) => void;
  handleEdit?: (task: Task) => void;
  handleDelete?: (id: string) => void;
  handleDateChange?: (
    id: string,
    dates: { startDate: Date | null; dueDate: Date | null }
  ) => void;
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
  handleDateChange,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef: setSortableNodeRef,
    transform,
    isDragging,
  } = useSortable({ id: task.id });

  const { setNodeRef: setDroppableNodeRef } = useDroppable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    transition: "border 0.2s ease, 0.3 ease"
  };
  // console.log(CSS.Transform.toString(transform));

  const isEditing = editingId === task.id;
  const [showDescription, setShowDescription] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(
    task.startDate || null
  );
  const [dueDate, setDueDate] = useState<Date | null>(task.dueDate || null);

  const onStartChange = (date: Date | undefined) => {
    const finalDate = date || null;
    setStartDate(finalDate);
    handleDateChange?.(task.id, { startDate: finalDate, dueDate });
  };

  const onDueChange = (date: Date | undefined) => {
    const finalDate = date || null;
    setDueDate(finalDate);
    handleDateChange?.(task.id, { startDate, dueDate: finalDate });
  };

  return (
    <div
      ref={(node) => {
        setSortableNodeRef(node);
        setDroppableNodeRef(node);
      }}
      {...attributes}
      {...listeners}
      style={style}
      className="group relative p-3 mb-4 bg-white shadow-sm rounded-xl cursor-grab hover:border-blue-500 hover:shadow-md transition duration-200"
    >
      {isEditing && editedTask ? (
        <div>
          <input
            className="w-full border p-2 mb-2 text-lg"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask?.({ ...editedTask, title: e.target.value })
            }
          />
          <textarea
            className="w-full border p-2 mb-4 text-lg"
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask?.({ ...editedTask, description: e.target.value })
            }
          />
          <button
            onClick={() => handleSave?.(task.id)}
            className="bg-green-500 text-white px-4 py-2 text-lg mr-2 rounded"
          >
            Save
          </button>
          <button
            onClick={() => setEditingId?.(null)}
            className="bg-gray-300 text-black px-4 py-2 text-lg rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-start justify-between">
          <div className="w-full p-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold capitalize text-2xl">{task.title}</h3>
            </div>
            <button
              onClick={() => setShowDescription((prev) => !prev)}
              className="mt-8 text-gray-500 hover:text-gray-700"
            >
              <span aria-label="card has description">
                <MenuIcon size={20} />
              </span>
            </button>

            {showDescription && (
              <div>
                <div className="border-t-2 mt-2">
                  <h3 className="text-gray-500 font-bold w-full mt-3">
                    Description
                  </h3>
                </div>
                <p className="text-lg text-gray-600 mt-2">{task.description}</p>
              </div>
            )}
            <div className="mt-4 flex gap-4 items-center ">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="border px-3 py-1 text-gray-600 rounded text-sm flex items-center space-x-2 bg-gray-100 hover:text-black nodrag">
                    <CalendarIcon className="w-4 h-4" />
                    <span>
                      {startDate ? format(startDate, "dd/MM/yy") : "Start Date"}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto mt-2">
                  <Calendar
                    mode="single"
                    selected={startDate || undefined}
                    onSelect={onStartChange}
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <button className="border px-3 py-1 text-gray-600 rounded text-sm flex items-center space-x-2 bg-gray-100 hover:text-black">
                    <CalendarIcon className="w-4 h-4" />
                    <span>
                      {dueDate ? format(dueDate, "dd/MM/yy") : "Due Date"}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto mt-2">
                  <Calendar
                    mode="single"
                    selected={dueDate || undefined}
                    onSelect={onDueChange}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="text-gray-500 hover:text-gray-700 transition">
                <EllipsisVertical size={24} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-white border border-gray-200 shadow-lg rounded-md py-2"
            >
              <DropdownMenuItem
                onClick={() => handleEdit?.(task)}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-black transition text-lg"
              >
                <SquarePen className="mr-3 text-gray-500" size={20} />
                Edit Task
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete?.(task.id)}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-black transition text-lg"
              >
                <Trash2 className="mr-3 text-gray-500" size={20} />
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
