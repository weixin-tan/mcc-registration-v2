import { useForm } from "react-hook-form";
import axios from "axios";
import Router from "next/router";
import { useContext } from "react";
import { AuthContext } from "./AuthWrapper";

interface Input {
  email: String;
  password: String;
}

export const TeacherSignInForm = () => {
  const { setRole } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: "onSubmit" });
  const onSubmit = async (data: Input) => {
    await axios
      .post("/api/auth/teacher/signin", {
        email: data.email,
        password: data.password,
      })
      .then((resp) => {
        console.log(resp.data.message);
        setRole(resp.data.role);
        Router.push("/teacher");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Email"
        {...register("email", {
          required: {
            value: true,
            message: "An email is required",
          },
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Please enter a valid email",
          },
        })}
      />
      {errors.email && <div>{errors.email.message.toString()}</div>}
      <input
        type="password"
        placeholder="Password"
        {...register("password", {
          required: { value: true, message: "Please enter a password" },
        })}
      />
      {errors.password && <div>{errors.password.message.toString()}</div>}
      <input type="submit" />
    </form>
  );
};
