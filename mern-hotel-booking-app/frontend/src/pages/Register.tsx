import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

export type RegisterFormdata = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirm_password: string;
};

const Register = () => {
  const  {showToast}  = useAppContext()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormdata>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      showToast({ message : "Registration Success", type : "SUCCESS" })
    },
    onError: (error: Error) => {
      showToast({message : error.message, type : 'ERROR'})
    },
  });

  const registerUser = (data: RegisterFormdata) => {
    const { firstname, lastname, email, password } = data;

    const payload = { firstname, lastname, email, password };

    mutation.mutate(payload);
  };

  return (
    <div className="container">
      <h5 className="text-center text-xl text-gray-700 my-4">Enter Details</h5>
      {/* <Toast type={"SUCCESS"} message={"MESSAGE"} onClose={() => {}} /> */}
      <form
        className="w-8/12 mx-auto p-5 border shadow-md shadow-black/20 rounded-2xl"
        onSubmit={handleSubmit(registerUser)}
      >
        <div className="flex items-start gap-3 my-5">
          <label htmlFor="firstname" className="w-full">
            Firstname:
            <input
              className="py-2.5 border border-gray-400 rounded-md px-3 w-full"
              type="text"
              placeholder="Enter firstname"
              {...register("firstname", {
                required: "Firstname cannot be empty",
              })}
            />
            {errors.firstname && (
              <p className="text-red text-sm font-semibold">
                {errors.firstname?.message as string}
              </p>
            )}
          </label>
          <label htmlFor="lastname" className="w-full">
            Lastname:
            <input
              className="py-2.5 border border-gray-400 rounded-md px-3 w-full"
              type="text"
              placeholder="Enter lastname"
              {...register("lastname", {
                required: "Lastname cannot be empty",
              })}
            />
            {errors.lastname && (
              <p className="text-red text-sm font-semibold">
                Field cannot be empty
              </p>
            )}
          </label>
        </div>
        <div className="my-5">
          <label htmlFor="email" className="w-full">
            Email Address:
            <input
              className="py-2.5 border border-gray-400 rounded-md px-3 w-full"
              type="email"
              placeholder="Enter Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/,
                  message: "Invalid email address",
                },
              })}
            />
          </label>
          {errors.email && (
            <>
              {errors.email?.type === "required" && (
                <p className="text-red text-sm font-semibold">
                  Field cannot be empty
                </p>
              )}

              {errors.email?.type === "pattern" && (
                <p className="text-red text-sm font-semibold">
                  {errors.email?.message as string}
                </p>
              )}
            </>
          )}
        </div>
        <div className="flex items-start gap-3 my-5">
          <label htmlFor="password" className="w-full">
            Password:
            <input
              className="py-2.5 border border-gray-400 rounded-md px-3 w-full"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Passwor is required",
                minLength: 6,
              })}
            />
            {errors.password && (
              <p className="text-red text-sm font-semibold">
                {errors.password?.message as string}
              </p>
            )}
          </label>
          <label htmlFor="lastname" className="w-full">
            Confirm Password:
            <input
              className="py-2.5 border border-gray-400 rounded-md px-3 w-full"
              type="password"
              placeholder="Confirm Password"
              {...register("confirm_password", {
                required: "please confirm your password",
                validate: (value) =>
                  value === watch("password") || "password do not match",
              })}
            />
            {errors.confirm_password && (
              <p className="text-red text-sm font-semibold">
                {errors.confirm_password?.message}
              </p>
            )}
          </label>
        </div>
        <div className="w-full text-center my-5">
          <button
            type="submit"
            className="py-2.5 px-6 rounded-md bg-blue-600 tracking-wider font-semibold text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
