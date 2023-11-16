import axios from "axios";

export const createJob = async (data: any) => {
  return await axios.post("http://localhost:8081/company/createCompany", {
    companyName: data.companyName,
    companyAddress: data.companyAddress,
    companyTelno: data.companyTelno,
    companyEmail: data.companyEmail,
    userEmail: data.userEmail,
    numberOfEmployees: data.numberOfEmployees,
  });
};

export const getAllCompany = async () => {
  return await axios.get("http://localhost:8081/company/getAllCompany");
};
