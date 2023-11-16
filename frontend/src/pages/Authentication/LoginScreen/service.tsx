import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";

import { login } from "../../../api/authentication";
export default function useLoginService() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  const LoginErrorSchema = yup.object({
    userName: yup.string().label("UserName").required(),
    password: yup.string().label("Password").required(),
  });

  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { errors: loginError },
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },
    resolver: yupResolver(LoginErrorSchema),
  });

  const handleOk: SubmitHandler<any> = async (formValues: any) => {
    console.log(formValues);
    try {
      const res = await login(formValues);
      if (res.data.message === "Success") {
        console.log("Login Success");
        console.log(res.data.data);
        localStorage.setItem("id", res.data.data.id);
        localStorage.setItem("firstName", res.data.data.firstName);
        localStorage.setItem("lastName", res.data.data.lastName);
        localStorage.setItem("email", res.data.data.email);
        localStorage.setItem("userName", res.data.data.username);
        localStorage.setItem("userRole", res.data.data.userRole);
        localStorage.setItem("profileImageUrl", res.data.data.profileImageUrl);
        localStorage.setItem("phoneNo", res.data.data.phoneNo);
        navigate("/dashboard");
      } else {
        console.log(res.data.message);
        Swal.fire("Something is wrong");
      }
    } catch (error: any) {
      console.log(error);
      Swal.fire(
        "Invalid Credentials",
        "Please Check Your Username and Paassword",
        "warning"
      );
      reset();
    }
  };

  return {
    handleSignUp,
    handleSubmit,
    control,
    handleOk,
    loginError,
  };
}
