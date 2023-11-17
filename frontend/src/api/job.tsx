import axios from "axios";

export const getAlljob = async () => {
  try {
    return await axios.get("http://localhost:8081/job/joblist");
    // const data = response.data;
    // console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export const addjob = async (data: any) => {
  const dataMapper = {
    id: data.id,
    companyName: data.companyName,
    title: data.title,
    jobType: data.jobType,
    specialisation: data.specialisation,
    companyLogoUrl: data.companyLogoUrl,
    state: data.state,
    experience: data.experience,
    salary: data.salary,
    location: data.location,
  };
  const formData = new FormData();
  Object.entries(dataMapper).forEach(([key, value]) => {
    value && formData.append(key, value);
  });
  console.log(formData);
  return await axios.post("http://localhost:8081/job/addjob", {
    formData,
  });
};

export const deleteJob = async (data: any) => {
  return await axios.post("http://localhost:8081/job/deletejoblist", data);
};

export const getJobDetailById = async (data: any) => {
  return await axios.post("http://localhost:8081/job/getjobDetailById", data);
};

export const searchJob = async (searchInput: any) => {
  return await axios.post("http://localhost:8081/job/searchJob", searchInput);
};

export const getAlljobApplication = async () => {
  try {
    return await axios.get(
      "http://localhost:8081/jobApplication/getAlljobApplication"
    );
  } catch (error) {
    console.error(error);
  }
};

export const updateJobAppStatus = async (id: string, status: string) => {
  return await axios.post(
    "http://localhost:8081/jobApplication/updateJobAppStatus",
    {
      jobApplicationId: id,
      status: status,
    }
  );
};
