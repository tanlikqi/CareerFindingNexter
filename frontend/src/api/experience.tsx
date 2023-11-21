import axios from "axios";

export const createExperience = async (data: any) => {
  return await axios.post(
    "http://localhost:8081/setupMgm/experience/createExperience",
    {
      name: data.name,
      status: data.status,
      createdBy: data.createdBy,
    }
  );
};

export const getAllExperience = async () => {
  return await axios.get(
    "http://localhost:8081/setupMgm/experience/getAllExperience"
  );
};

export const updateExperience = async (data: any) => {
  return await axios.post(
    "http://localhost:8081/setupMgm/experience/updateExperience",
    {
      id: data.id,
      name: data.name,
      status: data.status,
      updatedBy: data.updatedBy,
    }
  );
};

export const deleteExperience = async (data: any) => {
  return await axios.post(
    "http://localhost:8081/setupMgm/experience/deleteExperience",
    {
      data: data.id,
    }
  );
};
