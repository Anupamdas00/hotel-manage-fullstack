import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from '../api-client'
import { useAppContext } from "../contexts/AppContext";
import { useNavigate} from "react-router-dom";


export type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const { showToast } = useAppContext()
  const navigate = useNavigate()

  const signin = (data: LoginFormData) => {
    console.log(data);
    mutation.mutate(data)
  };

  const mutation = useMutation(apiClient.loginUser, {
    onSuccess : async() => {
        showToast({ message : "Login Success", type : "SUCCESS" });
        navigate('/')
    }, 
    onError : (error : Error) => {
        console.log(error);
        showToast({ message : "Invalid Credentials", type : "ERROR" })
    }
  }) 

  return (
    <div className="w-full">
        <h1 className="text-2xl text-gray-600 font-semibold tracking-wider py-5 text-center">Login</h1>
      <div>
        <form
          className="flex flex-col w-1/2 mx-auto space-y-4  border-2 border-blue-600 rounded-lg p-10"
          onSubmit={handleSubmit(signin)}
        >
          <label htmlFor="email">Email</label>
          <input
            className="py-2.5 px-2 rounded-md outline-1 outline-blue-600 border border-gray-600 "
            {...register("email")}
            type="email"
            id="email"
          />
          <label htmlFor="password">Password</label>
          <input
            className="py-2.5 px-2 rounded-md outline-1 outline-blue-600 border border-gray-600 "
            {...register("password")}
            type="password"
            id="password"
          />
          <button
            className="bg-blue-600 text-white p-2 rounded-md transit hover:bg-blue-700 duration-200"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
