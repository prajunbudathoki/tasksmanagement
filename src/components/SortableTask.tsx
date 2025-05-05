import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Task from "@/types/Task";

interface Props {
  task: Task;
}

export default function SortableTask({ task }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 mb-2 border border-gray-300 bg-white shadow-sm cursor-grab"
    >
      <h3 className="font-bold text-xl">{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
}
