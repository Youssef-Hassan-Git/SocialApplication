"use client";
import { useFormik } from "formik";
import React, { useState } from "react";
import { registerUser } from "../api/auth";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import ButtonLoader from "../Components/ButtonLoader";
import ErrorMessageDisplay from "../Components/ErrorMessage";
import InputError from "../Components/InputError";
import InputText from "../Components/InputText";
import RegisterMessage from "../Components/RegisterMessage";
import Gender from "../Components/Gender";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/Redux/ReduxStore";
import { AppDispatch } from "../lib/Redux/ReduxStore";
import { register } from "../lib/Redux/AuthSlice";
import { RegisterFormValues } from "../_interfaces/RegisterInterface";

export default function page() {
  const router = useRouter();
  const isLoading = useSelector(
    (state: RootState) => state.authSlice.isLoading,
  );
  const isSuccess = useSelector(
    (state: RootState) => state.authSlice.isSuccess,
  );
  const errorMessage = useSelector(
    (state: RootState) => state.authSlice.ErrorMessage,
  );
  const dispatch = useDispatch<AppDispatch>();

  const registerBody: RegisterFormValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    dateOfBirth: "",
    gender: "male",
  };

  const handleRegisterSubmit = async (values: RegisterFormValues) => {
    try {
      await dispatch(register(values)).unwrap();
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err: any) {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
    }
  };

  const registerSchema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),

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
      ),

    rePassword: yup
      .string()
      .required("Confirm your password")
      .oneOf([yup.ref("password")], "Passwords don't match"),

    dateOfBirth: yup.string().required("Date of birth is required"),

    gender: yup.string().required("Gender is required"),
  });

  const registerForm = useFormik({
    initialValues: registerBody,
    onSubmit: handleRegisterSubmit,
    validationSchema: registerSchema,
  });

  return (
    <div className="  pt-24 pb-8  border  bg-blue-50 ">
      <div className="min-h-screen flex justify-center items-center bg-blue-50">
        <div className="max-w-md w-full bg-white border-2 border-fuchsia-200 rounded-2xl shadow-xl p-8">
          {/* HEADER */}
          <h1 className="text-3xl font-bold text-center text-blue-500">
            Welcome To NextBoard
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Register to continue to NextBoard
          </p>

          {/* FORM */}

          <form onSubmit={registerForm.handleSubmit}>
            {/* name */}
            <InputText
              label="Name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={registerForm.values.name}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            />
            {registerForm.touched.name && registerForm.errors.name && (
              <InputError Form={registerForm} field="name" />
            )}
            {/* email */}
            <InputText
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={registerForm.values.email}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            />
            {registerForm.touched.email && registerForm.errors.email && (
              <InputError Form={registerForm} field="email"  />
            )}
            <InputText
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={registerForm.values.password}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            />

            {registerForm.touched.password && registerForm.errors.password && (
              <InputError Form={registerForm} field="password"  />
            )}

            <InputText
              label="Confirm Password"
              name="rePassword"
              type="password"
              placeholder="Confirm your password"
              value={registerForm.values.rePassword}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            />
            {registerForm.touched.rePassword &&
              registerForm.errors.rePassword && (
                <InputError Form={registerForm} field="rePassword"  />
              )}

            <InputText
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              placeholder=""
              value={registerForm.values.dateOfBirth}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            />

            {registerForm.touched.dateOfBirth &&
              registerForm.errors.dateOfBirth && (
                <InputError Form={registerForm} field="dateOfBirth" />
              )}

            <Gender registerForm={registerForm} />

            <button
              type="submit"
              disabled={isLoading}
              className={`mt-4 w-[80%] mx-auto block rounded-lg border-2 px-2 py-3 font-semibold transition-colors duration-200 ${
                isLoading
                  ? "bg-blue-300 border-blue-300 text-white cursor-not-allowed"
                  : "bg-blue-500 border-blue-600 text-white hover:bg-white hover:text-blue-500 cursor-pointer"
              }`}
            >
              {isLoading ? <ButtonLoader /> : "Register"}
            </button>
            {isSuccess ? <RegisterMessage /> : ""}

            {errorMessage ? <ErrorMessageDisplay message={errorMessage} /> : ""}
          </form>
        </div>
      </div>
    </div>
  );
}
