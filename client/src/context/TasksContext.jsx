import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  getTasksRequest,
  deleteTaskRequest,
  getTaskRequest,
  updateTaskRequest,
} from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("UseTasks must be used within a TaskProvider");
  }
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task) => {
    try {
      await createTaskRequest(task);
      const res = await getTasksRequest(); // Vuelve a obtener todas las tareas
      setTasks(res.data); // Actualiza el estado de las tareas
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status == 204) setTasks(tasks.filter(task => task._id != id));
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id)=>{
    try {
      const res = await getTaskRequest(id)
      return res.data;
    } catch (error) {
      console.log(error)
    }
  }

  const updateTask = async (id, task)=>{
    try {
      const res = updateTaskRequest(id, task)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TaskContext.Provider value={{ tasks, createTask, getTasks, getTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}
