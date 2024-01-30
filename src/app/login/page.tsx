"use client";
import { useForm, type FieldValues } from "react-hook-form";
import "./loginpage.style.scss";

import "./loginpage.style.scss";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
            <input {...register("email")} type="text" placeholder="Email" />
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            <input
              {...register("confirmpassword")}
              type="password"
              placeholder="Confirm Password"
            />
            <button disabled={isSubmitting} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
