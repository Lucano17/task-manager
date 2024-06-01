import { Link } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import styles from "./TasksPage.module.css";

import React, { useEffect } from "react";

const TasksPage = () => {
  const { getTasks, tasks } = useTasks();
  
  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length == 0) return (<h1>No tasks yet! Add new one <Link to="/tasks/new">HERE</Link></h1>)

  return (
  <div>
    {tasks.map(task =>(
      <div key={task._id}>
        <h1>{task.title}</h1>
        <p>{task.description}</p>
      </div>
    ))}
  </div>
  )
};

export default TasksPage;
