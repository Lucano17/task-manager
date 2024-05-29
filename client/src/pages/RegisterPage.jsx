import styles from "./RegisterPage.module.css";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
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
        {registerErrors.map((error, i) => (
          <div key={i} className={styles.registerError}>
            {error}
          </div>
        ))}
        <input
          className={styles.registerInput}
          type="text"
          placeholder="User name"
          {...register("username", { required: true })}
        />
        {errors.username && (
          <p className={styles.registerError}>Username is required</p>
        )}

        <input
          className={styles.registerInput}
          type="email"
          placeholder="E-mail"
          {...register("email", { required: true })}
        />
        {errors.username && (
          <p className={styles.registerError}>E-mail is required</p>
        )}

        <input
          className={styles.registerInput}
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.username && (
          <p className={styles.registerError}>Password is required</p>
        )}

        <button className={styles.registerButton} type="submit">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
