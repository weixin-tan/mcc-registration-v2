import { useForm } from "react-hook-form";
import axios from "axios";
import Router from "next/router";

interface Input {
  email: String;
  password: String;
}

export const TeacherSignUpForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ reValidateMode: "onSubmit" });
  const onSubmit = async (data: Input) => {
    console.log(data);
    await axios
      .post("/api/auth/teacher/signup", {
        email: data.email,
        password: data.password,
      })
      .then((resp) => {
        console.log(resp.data.message);
        Router.push("/teacher/login");
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
        type="text"
        placeholder="Email again"
        {...register("confirmEmail", {
          required: {
            value: true,
            message: "Please confirm your email",
          },
          validate: {
            emailEqual: (value) =>
              value === getValues().email || "Email does not match",
          },
        })}
      />
      {errors.confirmEmail && (
        <div>{errors.confirmEmail.message.toString()}</div>
      )}

      <input
        type="password"
        placeholder="Password"
        {...register("password", {
          required: true,
          minLength: { value: 8, message: "Minimum 8 characters required" },
        })}
      />
      {errors.password && <div>{errors.password.message.toString()}</div>}

      <input
        type="password"
        placeholder="Password again"
        {...register("confirmPassword", {
          required: true,
          minLength: 8,
          validate: {
            passwordEqual: (value) =>
              value === getValues().password || "Password does not match",
          },
        })}
      />
      {errors.password && <div>{errors.password.message.toString()}</div>}

      <input type="submit" />
    </form>
  );
};
