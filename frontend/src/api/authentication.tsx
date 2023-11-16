import axios from "axios";

export const login = async (data: any) => {
  return await axios.post("http://localhost:8081/auth/login", {
    userName: data.userName,
    password: data.password,
  });
};

export const signUp = async (data: any) => {
  return await axios.post("http://localhost:8081/auth//signup", {
    firstName: data.firstName,
    lastName: data.lastName,
    userName: data.userName,
    email: data.email,
    phoneNo: data.phoneNo,
    password: data.password,
    userRole: data.userRole,
  });
};
