import { LoginFormData } from "./pages/Login";

const VITE_API_BASE_URL = import.meta.env.VITE_BASE_URL;


export const register = async (formdata: any) => {
  const response = await fetch(`${VITE_API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formdata),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const validateToken = async () => {
  const response = await fetch(`${VITE_API_BASE_URL}/api/users/validate`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token Invalid");
  }

  return response.json();
};

export const loginUser = async (formdata: LoginFormData) => {
  const response = await fetch(`${VITE_API_BASE_URL}/api/users/login`, {
    method : "POST",
    credentials: "include",
    headers : { "Content-Type" : "application/json" },
    body : JSON.stringify(formdata)
  })

  const body = await response.json();
  console.log('body', body)

  if(!response.ok){
    throw new Error(body.message)
  }

  return body;
}


