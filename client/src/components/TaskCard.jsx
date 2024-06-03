import { useTasks } from "../context/TasksContext";
import styles from "./TaskCard.module.css";
import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const TaskCard = ({ task }) => {
  const { deleteTask } = useTasks();
  return (
    <div className={styles.taskCardContainer}>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>{dayjs(task.date).utc().format("DD/MM/YYYY")}</p>
      <div>
        <button
          className={styles.taskCardButtons}
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>
        <Link className={styles.taskCardButtons} to={`/tasks/${task._id}`}>
          Edit
        </Link>
      </div>
    </div>
  );
};

export default TaskCard;
