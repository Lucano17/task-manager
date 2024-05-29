import styles from "./RegisterPage.module.css";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className={styles.registerContainer}>
      <form className={styles.registerForm} onSubmit={onSubmit}>
        <input
          className={styles.registerInput}
          type="text"
          placeholder="User name"
          {...register("username", { required: true })}
        />

        <input
          className={styles.registerInput}
          type="email"
          placeholder="E-mail"
          {...register("email", { required: true })}
        />

        <input
          className={styles.registerInput}
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />

        <button className={styles.registerButton} type="submit">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
