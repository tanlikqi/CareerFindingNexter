import { useEffect, useState } from "react";
import { getAlljob } from "../../../api/job";
import { useNavigate } from "react-router-dom";

export default function useJobListService() {
  const userRole = localStorage.getItem("userRole");
  const [jobData, setJobData] = useState();

  useEffect(() => {
    getjob();
  }, []);

  const getjob = async () => {
    const res = await getAlljob();
    setJobData(res?.data);
    console.log(res?.data[3].postedDt);
  };

  const navigate = useNavigate();

  const goToAddJob = () => {
    navigate("/addjob");
  };

  return {
    jobData,
    goToAddJob,
    userRole,
  };
}
