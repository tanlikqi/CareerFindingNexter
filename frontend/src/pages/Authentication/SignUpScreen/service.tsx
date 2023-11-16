import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { signUp } from "../../../api/authentication";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import axios from "axios";

export default function useSignUpService() {
  const navigate = useNavigate();

  const [isJobSeeker, setIsJobSeeker] = useState(false);

  const [isJobPoster, setIsJobPoster] = useState(false);

  const [fileError, setFileError] = useState(false);

  const JobSeekerSchema = yup.object({
    firstName: yup.string().label("First Name").required(),
    lastName: yup.string().label("Last Name").required(),
    userName: yup.string().label("UserName").required(),
    email: yup.string().email().label("Email").required(),
    phoneNo: yup.string().label("Phone No").required(),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match") // Check if it matches the password field
      .required("Confirm Password is required"),
    userRole: yup.string(),
  });

  const JobPosterSchema = yup.object({
    firstName: yup.string().label("First Name").required(),
    lastName: yup.string().label("Last Name").required(),
    userName: yup.string().label("UserName").required(),
    email: yup.string().email().label("Email").required(),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match") // Check if it matches the password field
      .required("Confirm Password is required"),
    userRole: yup.string(),
    companyName: yup.string().label("Company Name").required(),
    companyTelNo: yup.string().label("Company Tel No").required(),
    companyAddress: yup.string().label("Company Address").required(),
    companyEmail: yup.string().email().label("Company Email").required(),
    numberOfEmployees: yup.string().label("Number of Employees").required(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors: signupErrors },
    reset,
    setValue,
    getValues,
  } = useForm<any>({
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      phoneNo: "",
      password: "",
      confirmPassword: "",
      userRole: "",
      companyName: "",
      companyTelNo: "",
      companyAddress: "",
      companyEmail: "",
      numberOfEmployees: "",
      companyLogoUrl: "",
    },
    resolver: yupResolver(
      isJobSeeker ? JobSeekerSchema : (JobPosterSchema as any)
    ),
  });

  useEffect(() => {
    if (isJobSeeker == true) {
      setValue("userRole", "jobSeeker");
    } else {
      setValue("userRole", "jobPoster");
    }
  }, [isJobSeeker, isJobPoster]);

  const handleCheckJobSeeker = () => {
    setIsJobSeeker(!isJobSeeker);
  };

  const handleCheckIsJobPoster = () => {
    setIsJobPoster(!isJobPoster);
  };

  const backToOption = () => {
    setIsJobPoster(false);
    setIsJobSeeker(false);
    reset();
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    console.log(event.target.files[0]);
    setValue("companyLogoUrl", file);
    setFileError(false);
  };

  const checkFile = () => {
    if (getValues("companyLogoUrl") == "") {
      setFileError(true);
    } else {
      setFileError(false);
    }
  };

  const goToLogin = () => {
    navigate("/");
  };

  const clearForm = () => {
    reset();
  };

  const handleOk: SubmitHandler<any> = async (formValues: any) => {
    const formData = new FormData();
    if (fileError == false) {
      try {
        const res = await signUp({
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          userName: formValues.userName,
          email: formValues.email,
          phoneNo: formValues.phoneNo,
          password: formValues.password,
          userRole: formValues.userRole,
        });

        if (isJobPoster) {
          formData.append("image", formValues.companyLogoUrl);
          formData.append("name", formValues.companyName);
          formData.append("address", formValues.companyAddress);
          formData.append("telno", formValues.companyTelNo);
          formData.append("companyEmail", formValues.companyEmail);
          formData.append("userEmail", formValues.email);
          formData.append("numberofEmployees", formValues.numberOfEmployees);

          const res2 = axios.post(
            "http://localhost:8081/company/createCompany",
            formData
          );

          console.log(res2);
          console.log(res);
        } else {
          null;
        }

        if (res.data.resultCode == 1) {
          reset();
          Swal.fire("Create Successfully", "", "success");
          setIsJobPoster(false);
          setIsJobSeeker(false);
        } else {
          Swal.fire("Something is Wrong", "", "error");
        }
      } catch (error: any) {
        if (error.response) {
          if (error.response.data.resultCode == 2) {
            Swal.fire("User already exists", "", "warning");
          } else {
            Swal.fire("Something is Wrong", "", "error");
          }
        }
        throw error;
      }
    } else {
      console.log("Error");
    }
  };

  return {
    goToLogin,
    handleSubmit,
    clearForm,
    handleOk,
    control,
    signupErrors,
    handleCheckJobSeeker,
    isJobSeeker,
    handleCheckIsJobPoster,
    isJobPoster,
    backToOption,
    handleFileChange,
    checkFile,
    fileError,
    getValues,
  };
}
