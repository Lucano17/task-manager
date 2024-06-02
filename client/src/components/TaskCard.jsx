import styles from "./TaskCard.module.css";
import React from "react";

const TaskCard = ({task}) => {
  return (
    <div className={styles.taskCardContainer}>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>{new Date(task.date).toLocaleDateString()}</p>
      <div>
        <button>Delete</button>
        <button>Edit</button>
    </div>
    </div>
  );
};

export default TaskCard;
