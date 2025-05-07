import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import React, { useState } from "react";
import "./App.css";
import Completed from "./components/Completed";
import Ongoing from "./components/Ongoing";
import Todo from "./components/Todo";
import useLocalStorage from "./hooks/useLocalStorage";
import Task, { TaskStatus } from "./types/Task";
import TaskDetailsCard from "./components/TaskDetailsCard";

const App = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  // const [newTask, setNewTask] = useState<Omit<Task, "id">>({
  //   title: "",
  //   description: "",
  //   status: "todo",
  // });

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) {
      return;
    }

    const activeTaskId = active.id as string;
    const overId = over.id as string;

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

  // const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
  //   const { name, value } = e.target;
  //   setNewTask({ ...newTask, [name]: value });
  // };

  // const addTask = (task: Omit<Task, "id">) => {
  //   setTasks([
  //     ...tasks,
  //     { ...task, id: crypto.randomUUID() },
  //   ]);
  // };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...updatedTask } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold text-center mb-6">Task Managements</h1>

      {/* <form
        onSubmit={(e) => {
          e.preventDefault();
          if (newTask.title && newTask.description) {
            addTask(newTask);
            setNewTask({ title: "", description: "", status: "todo" });
          }
        }}
        className="bg-white p-4 mb-6 max-w-[550px] mx-auto"
      >
        <input
          name="title"
          placeholder="Task title here..."
          value={newTask.title}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border text-xl"
        />
        <input
          name="description"
          placeholder="Description goes here..."
          value={newTask.description}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border text-xl"
        />
        <button type="submit" className="w-full bg-yellow-300 text-white py-2">
          Add Task
        </button>
      </form> */}

      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Todo
            tasks={tasks.filter((t) => t.status === "todo")}
            updateTask={updateTask}
            addTask={(task) =>
              setTasks([
                ...tasks,
                {
                  id: crypto.randomUUID(),
                  ...task,
                  status: "todo",
                },
              ])
            }
          />
          <Ongoing
            tasks={tasks.filter((t) => t.status === "ongoing")}
            updateTask={updateTask}
          />
          <Completed
            tasks={tasks.filter((t) => t.status === "completed")}
            deleteTask={deleteTask}
          />
          {/* <TaskDetailsCard
            task={{
              title: "Learn Kanbanchi basics",
              description:
                "Perform three tasks to learn how to create cards, lists, and share boards.",
              assignee: "Prajun Budhathoki",
              startDate: new Date("2025-01-12T07:58:00"),
              dueDate: new Date("2025-05-12T16:58:00"),
            }}
            onDateChange={({ startDate, dueDate }) => {
              console.log("Updated Start Date:", startDate);
              console.log("Updated Due Date:", dueDate);
            }}
          /> */}
        </div>
      </DndContext>
    </div>
  );
};

export default App;
