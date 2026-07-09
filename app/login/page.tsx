"use client";
import {  useFormik } from "formik";
import React, { useEffect, useState } from "react";

import * as yup from "yup";
import { useRouter } from "next/navigation";
import ButtonLoader from "../Components/ButtonLoader";
import LoginMessageSuccess from "../Components/LoginMessageSuccess";
import ErrorMessageDisplay from "../Components/ErrorMessage";
import InputError from "../Components/InputError";
import InputText from "../Components/InputText";
import { useDispatch, useSelector } from "react-redux";
import { clearError, login } from "../lib/Redux/AuthSlice";
import { RootState } from "../lib/Redux/ReduxStore";
import { AppDispatch } from "../lib/Redux/ReduxStore";
import { LoginFormValues } from "../_interfaces/LoginInterface";

export default function page() {
  const router = useRouter();
  const loginBody: LoginFormValues = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.authSlice.isLoading)
  const isSuccess  = useSelector((state: RootState) => state.authSlice.isSuccess )
  const errorMessage = useSelector((state: RootState) => state.authSlice.ErrorMessage)
  const error = useSelector((state: RootState) => state.authSlice.ErrorMessage);

  const handleLoginSubmit = async (values: LoginFormValues) => {
  try {
    await dispatch(login(values)).unwrap();

    setTimeout(() => {
      router.push("/");
    }, 1500);
  } 
    catch (err) {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
    }
    };

  const loginSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),

    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
      )
      .min(6, "Password must be at least 6 characters"),
  });

  const loginForm = useFormik({
    initialValues: loginBody,
    onSubmit: handleLoginSubmit,
    validationSchema: loginSchema,
  });

  useEffect(() => {
  if (error) {
    const timer = setTimeout(() => {
      dispatch(clearError());
    }, 2000);

    return () => clearTimeout(timer);
  }
}, [error, dispatch]);


  return (
    <div className="h-screen flex justify-center items-center border border-blue-100 bg-blue-50">
      <div className="max-w-md w-full bg-white border-2 border-fuchsia-200  rounded-2xl shadow-xl p-8">
        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center text-blue-500">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Sign in to continue to NextBoard
        </p>

        {/* FORM */}

        <form onSubmit={loginForm.handleSubmit}>
          {/* email */}
            <InputText
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={loginForm.values.email}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            />
          {loginForm.touched.email && loginForm.errors.email && (
             <InputError Form={loginForm} field="email" />
          )}
            {/* pass */}
          <InputText
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={loginForm.values.password}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            />
         {loginForm.touched.password && loginForm.errors.password && (
             <InputError Form={loginForm} field="password" />
          )}
            <button
            type="submit"
            disabled={isLoading}
            className={`mt-4 w-[80%] mx-auto block rounded-lg border-2 px-2 py-3 font-semibold transition-colors duration-200 ${
                isLoading
                ? "bg-blue-300 border-blue-300 text-white cursor-not-allowed"
                : "bg-blue-500 border-blue-600 text-white hover:bg-white hover:text-blue-500 cursor-pointer"
            }`}
            >
            {isLoading ? (
              <ButtonLoader />
            ) : (
              "Login"
            )}
          </button>
          {isSuccess ? (
                <LoginMessageSuccess />
          ) : (
            ""
          )}

          {errorMessage ? (
            <ErrorMessageDisplay message={errorMessage} />
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
}
