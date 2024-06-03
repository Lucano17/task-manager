import styles from "./TaskFormPage.module.css";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";

const TaskFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        console.log(task);
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, data)
    } else {
      createTask(data);
    }
    navigate("/tasks");
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
