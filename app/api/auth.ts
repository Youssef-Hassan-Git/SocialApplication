import axios from "axios";
import { LoginFormValues } from "../interfaces/LoginInterface";
import { BASE_URL } from "../constants/baseURL";

export const sendLoginData =  (values: LoginFormValues) =>{
   return  axios.post(`${BASE_URL}/users/signin`, values );

}


export const registerUser =(values: LoginFormValues) =>{
   return  axios.post(`${BASE_URL}/users/signup`, values );

}
