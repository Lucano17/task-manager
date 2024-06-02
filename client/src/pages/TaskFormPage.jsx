import styles from "./TaskFormPage.module.css";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import {useNavigate} from "react-router-dom"

import React from "react";

const TaskFormPage = () => {
  const { register, handleSubmit } = useForm();
  const { createTask } = useTasks();
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    createTask(data);
    navigate("/tasks")
  });

  return (
    <div className={styles.taskContainer}>
      <form onSubmit={onSubmit} className={styles.taskForm}>
        <h1>Add a new task!</h1>
        <input
          type="text"
          placeholder="Title"
          {...register("title")}
          autoFocus
        />
        <textarea
          name=""
          id=""
          rows="3"
          placeholder="Description"
          {...register("description")}
        />
        <button className={styles.taskButton}>Save</button>
      </form>
    </div>
  );
};

export default TaskFormPage;
