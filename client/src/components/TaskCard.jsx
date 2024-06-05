import { useTasks } from "../context/TasksContext";
import styles from "./TaskCard.module.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const TaskCard = ({ task }) => {
  const { deleteTask } = useTasks();
  const navigate = useNavigate();

  const handleDelete = () => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (confirmed) {
      deleteTask(task._id);
    } else {
      navigate("/tasks");
    }
  };

  return (
    <div className={styles.taskCardContainer}>
      <h1>{task.title}</h1>
      <p className={styles.taskCardDescription}>{task.description}</p>
      <p className={styles.taskCardDate}>{dayjs(task.date).utc().format("DD/MM/YYYY")}</p>
      <div>
        <button
          className={`${styles.taskButton} ${styles.taskCardDeleteButton}`}
          onClick={handleDelete}
        >
          Delete
        </button>
        <Link className={`${styles.taskButton} ${styles.taskCardEditButton}`} to={`/tasks/${task._id}`}>
          Edit
        </Link>
      </div>
    </div>
  );
};

export default TaskCard;