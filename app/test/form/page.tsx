'use client';

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Form Data: ", data);
    // Handle registration logic here, such as sending the data to an API
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-center flex-col gap-4 p-8 h-screen"
    >
      {/* Username Field */}
      <div className="flex flex-col w-full max-w-md">
        <label htmlFor="username" className="mb-2">Username</label>
        <input
          className="border p-2 rounded"
          placeholder="Enter your username"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && <span className="text-red-500">{errors.username.message}</span>}
      </div>

      {/* Email Field */}
      <div className="flex flex-col w-full max-w-md">
        <label htmlFor="email" className="mb-2">Email</label>
        <input
          type="email"
          className="border p-2 rounded"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </div>

      {/* Password Field */}
      <div className="flex flex-col w-full max-w-md">
        <label htmlFor="password" className="mb-2">Password</label>
        <input
          type="password"
          className="border p-2 rounded"
          placeholder="Enter your password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
      </div>

      {/* Confirm Password Field */}
      <div className="flex flex-col w-full max-w-md">
        <label htmlFor="confirmPassword" className="mb-2">Confirm Password</label>
        <input
          type="password"
          className="border p-2 rounded"
          placeholder="Confirm your password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
      </div>

      {/* Submit Button */}
      <div className="w-full max-w-md mt-4">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default Page;
