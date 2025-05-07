import { CalendarIcon, BellIcon, UserCircleIcon } from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";

type Props = {
  task: {
    title: string;
    description: string;
    assignee: string;
    startDate?: Date | null;
    dueDate?: Date | null;
  };
  onDateChange: (dates: { startDate: Date | null; dueDate: Date | null }) => void;
};

export default function TaskDetailsCard({ task, onDateChange }: Props) {
  const [startDate, setStartDate] = useState<Date | null>(task.startDate || null);
  const [dueDate, setDueDate] = useState<Date | null>(task.dueDate || null);

  const handleStartChange = (date: Date | undefined) => {
    const finalDate = date || null;
    setStartDate(finalDate);
    onDateChange({ startDate: finalDate, dueDate });
  };

  const handleDueChange = (date: Date | undefined) => {
    const finalDate = date || null;
    setDueDate(finalDate);
    onDateChange({ startDate, dueDate: finalDate });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Start working on it</h2>
      </div>
      <div className="mb-4">
        <h4 className="text-sm text-gray-500">Assignees</h4>
        <div className="flex items-center mt-2">
          <UserCircleIcon className="h-6 w-6 mr-2 text-gray-600" />
          <span>{task.assignee}</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">{task.title}</h3>
        <p className="text-gray-700">{task.description}</p>
      </div>
      <div className="mb-4">
        <h4 className="text-sm text-gray-500 mb-2">Start & Due Date</h4>
        <div className="flex space-x-4 items-center">
          <Popover>
            <PopoverTrigger asChild>
              <button className="border px-3 py-2 rounded text-sm flex items-center space-x-2 hover:bg-gray-100">
                <CalendarIcon className="w-4 h-4" />
                <span>{startDate ? format(startDate, "dd/MM/yy HH:mm") : "Start Date"}</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-auto mt-2">
              <Calendar mode="single" selected={startDate || undefined} onSelect={handleStartChange} />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <button className="border px-3 py-2 rounded text-sm flex items-center space-x-2 hover:bg-gray-100">
                <CalendarIcon className="w-4 h-4" />
                <span>{dueDate ? format(dueDate, "dd/MM/yy HH:mm") : "Due Date"}</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-auto mt-2">
              <Calendar mode="single" selected={dueDate || undefined} onSelect={handleDueChange} />
            </PopoverContent>
          </Popover>

          <BellIcon className="w-5 h-5 text-gray-500 ml-2" />
        </div>
      </div>
    </div>
  );
}
