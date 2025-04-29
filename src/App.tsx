import React, { useState } from "react";
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

  const handleInputChange : React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    // console.log("handleChagen", { name, value });
    setNewTask({ ...newTask, [name]: value })
  };

  const addTask = (e:React.FormEvent) => {
    e.preventDefault();
    if (newTask.title.trim() && newTask.description.trim()) {
      setTasks([...tasks, { ...newTask, id: crypto.randomUUID().toString() }]);
      setNewTask({ title: "", description: "", status: "todo" });
    }
  };

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    setTasks(
      tasks.map((v) => {
        if (v.id != id) return v;

        return {
          ...v,
          status: status,
        };
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-200 p-10">
      <h1 className="text-3xl font-bold text-center mb-6">Task Management</h1>
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
            placeholder="Enter the task desription here.."
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
        <Todo
          tasks={tasks.filter((task) => task.status === "todo")}
          updateStatus={updateTaskStatus}
        />
        <Ongoing
          tasks={tasks.filter((task) => task.status === "ongoing")}
          updateStatus={updateTaskStatus}
        />
        <Completed
          tasks={tasks.filter((task) => task.status === "completed")}
        />
      </div>
    </div>
  );
};

export default App;
