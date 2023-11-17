import { useEffect, useState } from "react";
import { deleteJob, getAlljob, searchJob } from "../../../api/job";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function useUserPostedJobList() {
  const [jobData, setJobData] = useState();

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getjob();
  }, []);

  const getjob = async () => {
    const res = await getAlljob();
    const userId = localStorage.getItem("id");
    const findjob = res?.data.filter((job: any) => job.userId == userId);
    setJobData(findjob);
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

  const handleDelete = (jobId: any) => {
    Swal.fire({
      title: "Are you sure want to delete?",
      text: "You can't revert this once it is done",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("yes");
        const res = await deleteJob({
          data: jobId,
        });
        if (res.data.Status == "Success") {
          Swal.fire("Deleted Successfully", "", "success");
        } else {
          Swal.fire("Something is wrong", "", "error");
        }
        getjob();
      } else {
        null;
      }
    });
  };
  return {
    jobData,
    goToAddJob,
    handleDelete,
    handleSearch,
    handleSubmitSearch,
    searchInput,
  };
}
