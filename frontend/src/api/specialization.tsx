import axios from "axios";

export const createSpecialization = async (data: any) => {
  return await axios.post(
    "http://localhost:8081/setupMgm/specialization/createSpecialization",
    {
      name: data.name,
      status: data.status,
      createdBy: data.createdBy,
    }
  );
};

export const getAllSpecialization = async () => {
  return await axios.get(
    "http://localhost:8081/setupMgm/specialization/getAllSpecialization"
  );
};

export const updateSpecialization = async (data: any) => {
  return await axios.post(
    "http://localhost:8081/setupMgm/specialization/updateSpecialization",
    {
      id: data.id,
      name: data.name,
      status: data.status,
      updatedBy: data.updatedBy,
    }
  );
};

export const deleteSpecialization = async (data: any) => {
  return await axios.post(
    "http://localhost:8081/setupMgm/specialization/deleteSpecialization",
    {
      data: data.id,
    }
  );
};
