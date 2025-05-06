import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import React, { useState } from "react";
import "./App.css";
import Completed from "./components/Completed";
import Ongoing from "./components/Ongoing";
import Todo from "./components/Todo";
import useLocalStorage from "./hooks/useLocalStorage";
import Task, { TaskStatus } from "./types/Task";


const App = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    status: "todo",
  });

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) {
      return;
    }

    const activeTaskId = active.id as string;
    console.log("activetaskid", activeTaskId);
    const overId = over.id as string;
    console.log("overid", overId);

    const activeTask = tasks.find((t) => t.id === activeTaskId);
    const overColumn = ["todo", "ongoing", "completed"].includes(overId)
      ? (overId as TaskStatus)
      : tasks.find((t) => t.id === overId)?.status;

    if (!overColumn) {
      return;
    }

    if (activeTask?.status === overColumn && active.id !== over.id) {
      const columnTasks = tasks.filter((t) => t.status === activeTask.status);

      const oldIndex = columnTasks.findIndex((t) => t.id === active.id);
      const newIndex = columnTasks.findIndex((t) => t.id === over.id);
      const newColumnOrder = arrayMove(columnTasks, oldIndex, newIndex);

      const otherTasks = tasks.filter((t) => t.status !== activeTask.status);
      setTasks([...otherTasks, ...newColumnOrder]);
    }

    if (activeTask?.status !== overColumn) {
      setTasks(
        tasks.map((task) =>
          task.id === activeTaskId ? { ...task, status: overColumn } : task
        )
      );
    }
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.title && newTask.description) {
      setTasks([
        ...tasks,
        { ...newTask, id: crypto.randomUUID(), status: "todo" },
      ]);
      setNewTask({ title: "", description: "", status: "todo" });
    }
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...updatedTask } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen p-10 bg-gray-900">
      <h1 className="text-4xl text-white font-bold text-center mb-6">
        Task Managements
      </h1>

      <form
        onSubmit={addTask}
        className="bg-white p-4 mb-6 max-w-[550px] mx-auto"
      >
        <input
          name="title"
          placeholder="Task title hre..."
          value={newTask.title}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border text-xl"
        />
        <input
          name="description"
          placeholder="description goes here.."
          value={newTask.description}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border text-xl"
        />
        <button type="submit" className="w-full bg-yellow-300 text-white py-2">
          Add Task
        </button>
      </form>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Todo
            tasks={tasks.filter((t) => t.status === "todo")}
            updateTask={updateTask}
          />
          <Ongoing
            tasks={tasks.filter((t) => t.status === "ongoing")}
            updateTask={updateTask}
          />
          <Completed
            tasks={tasks.filter((t) => t.status === "completed")}
            deleteTask={deleteTask}
          />
        </div>
      </DndContext>
    </div>
  );
};

export default App;
