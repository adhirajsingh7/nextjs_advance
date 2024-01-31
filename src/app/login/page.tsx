"use client";
import { useForm, type FieldValues } from "react-hook-form";
import "./loginpage.style.scss";

import "./loginpage.style.scss";
import { TSignupSchema, signUpSchema } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TSignupSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: TSignupSchema) => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // console.log(data);

    const response = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        confirmPassword: 213213123213,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const responseData = await response.json();
    if (!response) {
      alert("Submitting form failed");
      return;
    }
    if (responseData.errors) {
      const errors = responseData.errors;
      if (errors.email) {
        setError("email", {
          type: "server",
          message: errors.email,
        });
      } else if (errors.password) {
        setError("password", {
          type: "server",
          message: errors.password,
        });
      } else if (errors.confirmPassword) {
        setError("confirmPassword", {
          type: "server",
          message: errors.confirmPassword,
        });
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
            <input {...register("email")} type="text" placeholder="Email" />
            {errors.email && (
              <div style={{ color: "red" }}>{`${errors.email.message}`}</div>
            )}
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <div style={{ color: "red" }}>{`${errors.password.message}`}</div>
            )}
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <div
                style={{ color: "red" }}
              >{`${errors.confirmPassword.message}`}</div>
            )}
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
