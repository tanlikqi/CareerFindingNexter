import { useLocation } from "react-router-dom";
import { getAlljobApplication, getJobDetailById } from "../../../api/job";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Swal from "sweetalert2";

export default function useJobDetailService() {
  const userEmail = localStorage.getItem("email");

  const userPhoneNo = localStorage.getItem("phoneNo");

  const userRole = localStorage.getItem("userRole");

  const userId = localStorage.getItem("id");

  const firstName = localStorage.getItem("firstName");

  const lastName = localStorage.getItem("lastName");

  const id = useLocation();

  const selectedjobId = id.state?.jobId;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [fileError, setFileError] = useState(false);

  const [isMatch, setIsMatch] = useState(false);

  const [jobApplication, setJobApplication] = useState([]);

  const [disableApply, setDisableApply] = useState(false);

  const JobApplySchema = yup.object({
    email: yup.string().email().required().label("Email"),
    phoneNo: yup.string().required().label("Phone No"),
    description: yup.string().required().label("Description"),
  });

  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    handleSubmit,
    reset,
    watch,
  } = useForm<any>({
    defaultValues: {
      userId: "",
      jobId: "",
      companyId: "",
      jobTitle: "",
      applicantName: "",
      resume: "",
      phoneNo: "",
      email: "",
      description: "",
      posterId: "",
    },
    resolver: yupResolver(JobApplySchema),
  });

  const [jobdetail, setJobdetail] = useState({
    companyLogoUrl: "",
    companyName: "",
    description: [{ jobDescriptionContent: "" }],
    experience: "",
    jobId: "",
    jobType: "",
    location: "",
    postedDt: "",
    requirement: [{ jobRequirementContent: "" }],
    salary: "",
    specialisation: "",
    state: "",
    title: "",
    userId: "",
    status: "",
  });

  useEffect(() => {
    getJobDetail();
  }, []);

  useEffect(() => {
    retrieveJobApplication();
  }, []);

  const retrieveJobApplication = async () => {
    const res = await getAlljobApplication();
    const userId = localStorage.getItem("id");
    const findJob = res?.data.filter((resume: any) => resume.userId == userId);
    console.log(findJob, "findJob");
    setJobApplication(findJob);
  };

  useEffect(() => {
    if (userId) {
      const hasMatch = jobApplication.some(
        (application: any) =>
          application.userId === parseInt(userId) &&
          application.jobId === parseInt(getValues("jobId"))
      );

      setIsMatch(hasMatch);
    } else {
      console.log("no user Id");
    }
  }, [jobApplication, userId, watch("jobId")]);

  console.log(isMatch);

  const getJobDetail = async () => {
    const res = await getJobDetailById({ data: selectedjobId });
    console.log(res.data.data);

    // setJobdetail(res.data.data);
    const descriptions = JSON.parse(res.data.data.description);
    const requirements = JSON.parse(res.data.data.requirement);
    setJobdetail({
      ...jobdetail,
      description: descriptions,
      requirement: requirements,
      companyName: res.data.data.companyName,
      companyLogoUrl: res.data.data.companyLogoUrl,
      salary: res.data.data.salary,
      jobType: res.data.data.jobType,
      postedDt: res.data.data.postedDt,
      location: res.data.data.location,
      title: res.data.data.title,
    });
    setValue("jobTitle", res.data.data.title);
    setValue("companyId", res.data.data.companyId);
    setValue("jobId", res.data.data.jobId);
    setValue("posterId", res.data.data.userId);
    if (userId != null) {
      setValue("userId", userId);
    }
    if (userEmail != null) {
      setValue("email", userEmail);
    }
    if (userPhoneNo != null) {
      setValue("phoneNo", userPhoneNo);
    }
    if (lastName && firstName) {
      setValue("applicantName", firstName + " " + lastName);
    }
    setValue("status", "PENDING");
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
    if (userId != null) {
      setValue("userId", userId);
    }
    if (userEmail != null) {
      setValue("email", userEmail);
    }
    if (userPhoneNo != null) {
      setValue("phoneNo", userPhoneNo);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const checkFile = () => {
    if (getValues("resume") == "") {
      setFileError(true);
    } else {
      setFileError(false);
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    console.log(event.target.files[0]);
    setValue("resume", file);
    setFileError(false);
  };

  const handleOk: SubmitHandler<any> = async (formValues: any) => {
    console.log(formValues);
    const formData = new FormData();

    if (fileError == false) {
      formData.append("resume", formValues.resume);
      formData.append("userId", formValues.userId);
      formData.append("jobId", formValues.jobId);
      formData.append("companyId", formValues.companyId);
      formData.append("jobTitle", formValues.jobTitle);
      formData.append("applicantPhoneNo", formValues.phoneNo);
      formData.append("applicantEmail", formValues.email);
      formData.append("description", formValues.description);
      formData.append("posterId", formValues.posterId);
      formData.append("status", formValues.status);
      formData.append("applicantName", formValues.applicantName);

      const res = await axios.post(
        "http://localhost:8081/jobApplication/applyJob",
        formData
      );
      console.log(res);
      if (res.data.Status == "Success") {
        Swal.fire("Create Successfully", "", "success");
        setIsModalVisible(false);
        reset();
        setDisableApply(true);
      }
    } else {
      console.log("No resume");
    }

    console.log(formValues);
  };

  return {
    jobdetail,
    isModalVisible,
    handleOpenModal,
    handleCloseModal,
    control,
    handleOk,
    handleSubmit,
    errors,
    userRole,
    checkFile,
    fileError,
    handleFileChange,
    isMatch,
    disableApply,
  };
}
