import axios from "axios";

export const createState = async (data: any) => {
  return await axios.post("http://localhost:8081/setupMgm/state/createState", {
    name: data.name,
    status: data.status,
    createdBy: data.createdBy,
  });
};

export const getAllState = async () => {
  return await axios.get("http://localhost:8081/setupMgm/state/getAllState");
};

export const updateState = async (data: any) => {
  return await axios.post("http://localhost:8081/setupMgm/state/updateState", {
    id: data.id,
    name: data.name,
    status: data.status,
    updatedBy: data.updatedBy,
  });
};

export const deleteState = async (data: any) => {
  return await axios.post("http://localhost:8081/setupMgm/state/deleteState", {
    data: data.id,
  });
};
