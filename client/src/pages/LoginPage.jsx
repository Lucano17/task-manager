import React, { useEffect } from "react";
import styles from "./LoginPage.module.css";
import {useForm} from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";


const LoginPage = () => {
  
const { register, handleSubmit, formState: {errors} } = useForm();
const {signin, errors: signinErrors, isAuthenticated} = useAuth()
const navigate = useNavigate()

const onSubmit = handleSubmit((data) => {
  signin(data);
});

  useEffect(()=>{
    if (isAuthenticated) navigate("/tasks")
  },[isAuthenticated])

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={onSubmit}>
        <h1>Log in</h1>
        {signinErrors.map((error, i)=>(
          <div key={i} className={styles.loginError}>
            {error}
          </div>
        ))}
        <input
          className={styles.loginInput}
          type="email"
          placeholder="E-mail"
          {...register("email", { required: true })}
          />
        {errors.email && (
          <p className={styles.loginError}>E-mail is required</p>
        )}

        <input
          className={styles.loginInput}
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
          />
        {errors.password && (
          <p className={styles.loginError}>Password is required</p>
        )}

        <button className={styles.loginButton} type="submit">
          Log in
        </button>
      </form>
      <p className={styles.moveToRegister}>
        Don't have an account? <Link className={styles.moveToRegisterButton} to="/register">Sign up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
