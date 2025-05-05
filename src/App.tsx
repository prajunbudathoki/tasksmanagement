import React, { useState } from "react";
import Completed from "./components/Completed";
import Ongoing from "./components/Ongoing";
import Todo from "./components/Todo";
import useLocalStorage from "./hooks/useLocalStorage";
import Task, { TaskStatus } from "./types/Task";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
// import SortableTask from "./components/useSortable";
import "./App.css";
// import {
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";

const App = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    status: "todo",
  });

  // const [editingId, setEditingId] = useState<string | null>(null);
  // const [editedTask, setEditedTask] = useState({ title: "", description: "" });

  // const handleEdit = (task: Task) => {
  //   setEditingId(task.id);
  //   setEditedTask({ title: task.title, description: task.description });
  // };

  // const handleSave = (taskId: string) => {
  //   setTasks(
  //     tasks.map((task) =>
  //       task.id === taskId ? { ...task, ...editedTask } : task
  //     )
  //   );
  //   setEditingId(null);
  // };

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over) {
      return;
    }
    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;

    if (taskId !== newStatus) {
      const activeTask = tasks.filter((task) => task.id === taskId);
      console.log("activetask", activeTask);
      const overTask = tasks.filter((task) => task.id === newStatus);
      console.log("overtask", overTask);
    }

    // console.log(`Moving ${taskId} to ${newStatus}`);

    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
  }

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.title.trim() && newTask.description.trim()) {
      setTasks([...tasks, { ...newTask, id: crypto.randomUUID().toString() }]);
      setNewTask({ title: "", description: "", status: "todo" });
    }
  };

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    setTasks(
      tasks.map((task) => {
        if (task.id !== id) return task;
        return {
          ...task,
          status: status,
        };
      })
    );
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(
      tasks.map((task) => {
        if (task.id !== id) {
          return task;
        }
        return {
          ...task,
          ...updatedTask,
        };
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl text-white font-bold text-center mb-6">
        Task Management
      </h1>
      <form
        onSubmit={addTask}
        className="bg-white p-4 mb-6 max-w-[450px] mx-auto"
      >
        <div className="mb-4">
          <input
            type="text"
            name="title"
            placeholder="Enter the task title here...."
            value={newTask.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="description"
            placeholder="Enter the task description here.."
            value={newTask.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-amber-400 text-white py-2 cursor-pointer"
        >
          Add Task
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DndContext onDragEnd={handleDragEnd}>
          <Todo
            tasks={tasks.filter((task) => task.status === "todo")}
            updateStatus={updateTaskStatus}
            updateTask={updateTask}
          />
          <Ongoing
            tasks={tasks.filter((task) => task.status === "ongoing")}
            updateStatus={updateTaskStatus}
            updateTask={updateTask}
          />
          <Completed
            tasks={tasks.filter((task) => task.status === "completed")}
            deleteTask={deleteTask}
          />
          {/* <DragOverlay
              dropAnimation={{
                easing: "cubic-bezier(0.8, 0.67, 0.6, 1.22)",
              }}
            >
              {activeTask ? (
                <div className="p-4 border border-gray-300 bg-white shadow-lg">
                  <h3 className="font-bold text-xl">{activeTask.title}</h3>
                  <p>{activeTask.description}</p>
                </div>
              ) : null}
            </DragOverlay> */}
        </DndContext>
      </div>
    </div>
  );
};

export default App;
