import { useEffect, useState } from "react";
import { getAlljobApplication, updateJobAppStatus } from "../../../api/job";
import Swal from "sweetalert2";

export default function useJobApplicationService() {
  const [resume, setResume] = useState([]);

  const [viewedResume, setViewedResume] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [description, setDescription] = useState("");

  const [resumeLink, setResumeLink] = useState("");

  const [jobAppId, setJobAppId] = useState("");

  const [jobStatus, setJobStatus] = useState("");

  useEffect(() => {
    retrieveJobApplication();
  }, []);

  const retrieveJobApplication = async () => {
    const res = await getAlljobApplication();
    const posterId = localStorage.getItem("id");
    const findResume = res?.data.filter(
      (resume: any) => resume.posterId == posterId
    );

    setResume(findResume);
  };

  const viewResumeDetail = async (
    descriptionItem: string,
    resumeLinkITem: string,
    id: string,
    status: string
  ) => {
    console.log(id);
    console.log(status);
    if (status == "CONFIRM" || status == "REJECT") {
      console.log("confirm or reject");
    } else {
      console.log("un api");
      const res = await updateJobAppStatus(id, "VIEWED");
      retrieveJobApplication();
      console.log(res);
    }
    setIsModalVisible(true);
    setDescription(descriptionItem);
    setResumeLink(resumeLinkITem);
    setJobAppId(id);
    setJobStatus(status);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleStatusJobApp = async (id: string, status: string) => {
    console.log(id);
    console.log(status);
    Swal.fire({
      title: `Are you sure you wan to ${status} this job application?`,
      icon: "warning",
      text: "You cant revert it back!",
      cancelButtonText: "No",
      cancelButtonColor: "#d32f2f",
      confirmButtonText: "Yes",
      confirmButtonColor: "green",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await updateJobAppStatus(id, status);
        if (res.request.status == 200) {
          Swal.fire("Updated Successfully", "", "success");
        } else {
          Swal.fire("Something is wrong", "", "error");
        }
        retrieveJobApplication();
      } else {
        null;
      }
    });
    setIsModalVisible(false);

    // console.log(res);
  };

  return {
    resume,
    viewResumeDetail,
    handleCancel,
    isModalVisible,
    description,
    resumeLink,
    handleStatusJobApp,
    jobAppId,
    jobStatus,
  };
}
