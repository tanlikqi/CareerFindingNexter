import { useEffect, useState } from "react";
import { getAlljob, searchJob } from "../../../api/job";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function useJobListService() {
  const { searchInputs } = useSelector((state: any) => state.searchInput);

  console.log(searchInputs);

  const userRole = localStorage.getItem("userRole");

  const [jobData, setJobData] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getjob();
  }, []);

  useEffect(() => {
    fromDashboard();
    setSearchInput(searchInputs);
  }, [searchInputs]);

  const fromDashboard = async () => {
    const res = await searchJob({ searchInput: searchInputs });
    const result = res.data.data;
    if (res.request.status == 200) {
      setJobData(res.data.data);
    }
    console.log(result);
  };

  const getjob = async () => {
    const res = await getAlljob();
    setJobData(res?.data);
  };

  const navigate = useNavigate();

  const goToAddJob = () => {
    navigate("/addjob");
  };

  const handleSearch = (e: any) => {
    setSearchInput(e.target.value);
  };

  const handleSubmitSearch = async () => {
    const res = await searchJob({ searchInput: searchInput });
    const result = res.data.data;
    if (res.request.status == 200) {
      setJobData(res.data.data);
    }
    console.log(result);
  };

  return {
    jobData,
    goToAddJob,
    userRole,
    handleSubmitSearch,
    handleSearch,
    searchInput,
  };
}
