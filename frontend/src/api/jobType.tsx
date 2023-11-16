import axios from "axios";

export const createJobType = async (data: any) => {
  return await axios.post(
    "http://localhost:8081/setupMgm/jobType/createJobType",
    {
      name: data.name,
      status: data.status,
      createdBy: data.createdBy,
    }
  );
};

export const getAllJobType = async () => {
  return await axios.get(
    "http://localhost:8081/setupMgm/jobType/getAllJobType"
  );
};

export const updateJobType = async (data: any) => {
  return await axios.post(
    "http://localhost:8081/setupMgm/jobType/updateJobType",
    {
      id: data.id,
      name: data.name,
      status: data.status,
      updatedBy: data.updatedBy,
    }
  );
};

export const deleteJobType = async (data: any) => {
  return await axios.post(
    "http://localhost:8081/setupMgm/jobType/deletejobType",
    {
      data: data.id,
    }
  );
};
