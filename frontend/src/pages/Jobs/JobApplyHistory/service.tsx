import { useEffect, useState } from "react";
import { getAlljobApplication } from "../../../api/job";
import { getAllCompany } from "../../../api/company";
import { baseURL } from "../../../utils/Contants";

export default function useJobApplicationHistoryService() {
  const [resume, setResume] = useState([]);

  const [companyDetail, setCompanyDetail] = useState([]);

  const [jobAppHistoryDetail, setJobAppHistoryDetail] = useState([]);

  useEffect(() => {
    retrieveJobApplication();
    retrieveAllCompany();
  }, []);

  const retrieveJobApplication = async () => {
    const res = await getAlljobApplication();
    const userId = localStorage.getItem("id");
    const findResume = res?.data.filter(
      (resume: any) => resume.userId == userId
    );
    setResume(findResume);
    console.log(resume, "resume");
  };

  const retrieveAllCompany = async () => {
    const res = await getAllCompany();
    setCompanyDetail(res.data);
    console.log(res.data, "company");
  };

  useEffect(() => {
    const combinedArray = resume.map((jobApp: any) => {
      const matchingCompany: any = companyDetail.find(
        (company: any) => company.companyId === jobApp.companyId
      );

      if (matchingCompany) {
        return {
          ...jobApp,
          companyName: matchingCompany.name,
          companyEmail: matchingCompany.companyEmail,
          companyLogoUrl: baseURL + "images/" + matchingCompany.companyLogoUrl,
        };
      }
      return jobApp;
    });
    setJobAppHistoryDetail(combinedArray as any);
  }, [resume, companyDetail]);

  console.log(jobAppHistoryDetail, "combine Array");

  return { resume, jobAppHistoryDetail };
}
