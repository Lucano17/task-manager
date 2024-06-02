import { Link } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import styles from "./TasksPage.module.css";
import React, { useEffect } from "react";
import TaskCard from "../components/TaskCard";

const TasksPage = () => {
  const { getTasks, tasks } = useTasks();
  
  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length == 0) return (<h1>No tasks yet! Add new one <Link to="/tasks/new">HERE</Link></h1>)

  return (
  <div className={styles.tasksPageContainer}>
    {tasks.map(task =>(
      <TaskCard task={task} key={task._id}/>
    ))}
  </div>
  )
};

export default TasksPage;
