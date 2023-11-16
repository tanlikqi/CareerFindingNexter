import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { baseURL } from "../../../utils/Contants";
import { getJobDetailById } from "../../../api/job";
import { getAllJobType } from "../../../api/jobType";
import { getAllState } from "../../../api/state";
import { getAllSpecialization } from "../../../api/specialization";

export default function useEditJobService() {
  const id = useLocation();

  const selectedjobId = id.state?.jobId;

  const EditJobSchema = yup.object({
    // companyLogoUrl: yup
    //   .mixed()
    //   .test("fileSize", "File size is too large", (value: any) => {
    //     return value && value[0] ? value[0].size <= 1024000 : true;
    //   })
    //   .test("fileType", "Invalid file type", (value: any) => {
    //     return value && value[0]
    //       ? ["image/jpeg", "image/png"].includes(value[0].type)
    //       : true;
    //   })
    //   .required("File is required"),
    companyName: yup.string().label("Company Name").required(),
    title: yup.string().label("Title").required(),
    jobType: yup.string().label("Job Type").required(),
    specialisation: yup.string().label("Specialisation").required(),
    state: yup.string().label("State").required(),
    experience: yup.string().label("Experience").required(),
    salary: yup.string().label("Salary").required(),
    location: yup.string().label("Location").required(),
    jobRequirements: yup.array(
      yup.object({
        jobRequirementContent: yup.string().required().label("Requirement"),
      })
    ),
    jobDescriptions: yup.array(
      yup.object({
        jobDescriptionContent: yup.string().required().label("Description"),
      })
    ),
  });

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    formState: { errors: EditJob },
  } = useForm<any>({
    defaultValues: {
      jobId: selectedjobId,
      userId: localStorage.getItem("id"),
      companyLogoUrl: "",
      companyName: "",
      title: "",
      jobType: "",
      specialisation: "",
      state: "",
      experience: "",
      salary: "",
      location: "",
      jobRequirements: [{ jobRequirementContent: "" }],
      jobDescriptions: [{ jobDescriptionContent: "" }],
    },
    resolver: yupResolver(EditJobSchema),
  });

  const {
    fields: fieldReq,
    append: appendReq,
    remove: removeReq,
  } = useFieldArray({
    name: "jobRequirements",
    control,
  });

  const {
    fields: fieldDes,
    append: appendDes,
    remove: removeDes,
  } = useFieldArray({
    name: "jobDescriptions",
    control,
  });

  const navigate = useNavigate();

  const [isJobReqModalVisible, setisJobReqModalVisible] = useState(false);

  const [isJobDesModalVisible, setIsJobDesModalVisible] = useState(false);

  const [fileError, setFileError] = useState(false);

  const [jobTypeData, setJobTypeData] = useState([]);

  const [stateData, setStateData] = useState([]);

  const [specialisationData, setSpecialisationData] = useState({});

  useEffect(() => {
    const retrieveAllJobType = async () => {
      const res = await getAllJobType();
      const jobType = res.data;
      const filteredJobType = jobType.filter(
        (item: any) => item.status === "ACTIVE"
      );
      setJobTypeData(filteredJobType);
    };

    retrieveAllJobType();
  }, []);

  useEffect(() => {
    const retrieveAllSpecialization = async () => {
      const res = await getAllSpecialization();
      const specialisationdata = res.data;
      console.log(res.data);
      const filteredSpecialisation = specialisationdata.filter(
        (item: any) => item.status === "ACTIVE"
      );
      setSpecialisationData(filteredSpecialisation);
    };

    retrieveAllSpecialization();
  }, []);

  useEffect(() => {
    const retrieveAllState = async () => {
      const res = await getAllState();
      const statedata = res.data;
      const filteredState = statedata.filter(
        (item: any) => item.status === "ACTIVE"
      );
      setStateData(filteredState);
    };

    retrieveAllState();
  }, []);

  useEffect(() => {
    getJobDetail();
  }, [selectedjobId]);

  const getJobDetail = async () => {
    const res = await getJobDetailById({ data: selectedjobId });

    console.log(res.data.data);

    setValue("companyLogoUrl", res.data.data.companyLogoUrl);
    // setValue("companyLogoUrl", res.data.data.companyLogoUrl);
    setValue("companyName", res.data.data.companyName);
    setValue("title", res.data.data.title);
    setValue("jobType", res.data.data.jobType);
    setValue("specialisation", res.data.data.specialisation);
    setValue("state", res.data.data.state);
    setValue("experience", res.data.data.experience);
    setValue("salary", res.data.data.salary);
    setValue("location", res.data.data.location);
    console.log(res.data.data.description);

    const descriptions = JSON.parse(res.data.data.description);
    const requirements = JSON.parse(res.data.data.requirement);

    setValue("jobDescriptions", descriptions);
    setValue("jobRequirements", requirements);
  };

  const showJobReqModal = () => {
    setisJobReqModalVisible(true);
  };

  const showJobDesModal = () => {
    setIsJobDesModalVisible(true);
  };

  const closeJobReqModal = () => {
    setisJobReqModalVisible(false);
  };

  const closeJobDesModal = () => {
    setIsJobDesModalVisible(false);
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

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const handleOk: SubmitHandler<any> = async (formValues: any) => {
    console.log(formValues);

    if (getValues("companyLogoUrl")) {
      const formData = new FormData();
      const jobRequirementsJSON = JSON.stringify(formValues.jobRequirements);
      const jobDescriptionsJSON = JSON.stringify(formValues.jobDescriptions);

      formData.append("jobId", formValues.jobId);
      formData.append("image", formValues.companyLogoUrl);
      formData.append("companyName", formValues.companyName);
      formData.append("experience", formValues.experience);
      formData.append("userId", formValues.userId);
      formData.append("jobRequirements", jobRequirementsJSON);
      formData.append("jobDescriptions", jobDescriptionsJSON);
      formData.append("jobType", formValues.jobType);
      formData.append("location", formValues.location);
      formData.append("salary", formValues.salary);
      formData.append("specialisation", formValues.specialisation);
      formData.append("state", formValues.state);
      formData.append("title", formValues.title);

      axios
        .post("http://localhost:8081/job/updateJob", formData)
        .then((res) => {
          if (res.data.Status == "Success") {
            console.log("Success");
            Swal.fire("Updated Successfully", "", "success");
            navigate("/userpostedjoblist");
          } else {
            console.log("Failed");
            Swal.fire("Something is Wrong", "", "error");
          }
        })
        .catch((err) => console.log(err));
    }
    reset();
  };

  return {
    isJobReqModalVisible,
    showJobReqModal,
    closeJobReqModal,
    control,
    handleSubmit,
    handleOk,
    getValues,
    handleFileChange,
    EditJob,
    checkFile,
    fileError,
    handleCancel,
    isJobDesModalVisible,
    showJobDesModal,
    closeJobDesModal,
    fieldDes,
    appendDes,
    removeDes,
    fieldReq,
    appendReq,
    removeReq,
    jobTypeData,
    stateData,
    specialisationData,
  };
}
