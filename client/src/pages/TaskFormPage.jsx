import styles from "./TaskFormPage.module.css";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

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
        setValue("date", dayjs.utc(task.date).format("YYYY-MM-DD"))
      }
    };
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };
    if (data.date) dataValid.date = dayjs.utc(data.date).format();
    if (params.id) {
      updateTask(params.id, dataValid);
    } else {
      createTask(dataValid);
    }
    navigate("/tasks");
  });

  return (
    <div className={styles.taskContainer}>
      <form onSubmit={onSubmit} className={styles.taskForm}>
        <h1>Add a new task!</h1>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          placeholder="Title"
          {...register("title")}
          autoFocus
        />
        <label htmlFor="description">Description</label>
        <textarea
          name=""
          id=""
          rows="3"
          placeholder="Description"
          {...register("description")}
        />
        <label htmlFor="date">Do on</label>
        <input type="date" {...register("date")} />
        <button className={styles.taskButton}>Save</button>
      </form>
    </div>
  );
};

export default TaskFormPage;
