import { useEffect, useState } from "react";
import { deleteJob, getAlljob } from "../../../api/job";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function useUserPostedJobList() {
  const [jobData, setJobData] = useState();

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
  return { jobData, goToAddJob, handleDelete };
}
