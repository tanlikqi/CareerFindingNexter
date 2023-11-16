import { useEffect } from "react";
import Login from "./pages/Authentication/LoginScreen/index";
import "./App.css";
import SignUp from "./pages/Authentication/SignUpScreen";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import MainLayout from "./components/MainLayout";
import JobList from "./pages/Jobs/JobList";
import JobDetail from "./pages/Jobs/JobDetails";
import AddJob from "./pages/Jobs/AddJob";
import UserPostedJobList from "./pages/Jobs/UserPostedJobList";
import EditJob from "./pages/Jobs/EditJob";
import JobTypeSetup from "./pages/SetupMagement/JobTypeSetup";
import SpecializationSetup from "./pages/SetupMagement/SpecializationSetup";
import JobApplication from "./pages/Jobs/JobApplication";
import Profile from "./pages/Profile";
import StateSetup from "./pages/SetupMagement/StateSetup";
import JobApplicationHitory from "./pages/Jobs/JobApplyHistory";
function App() {
  // useEffect(() => {
  //   fetch("http://localhost:8081/users")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => console.log(data))
  //     .catch((error) => console.log(error));
  // }, []);

  // }

  // const userId = localStorage.getItem("userId");

  // if (!userId) {
  //   window.location.href = "/";
  // }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/joblist" element={<JobList />} />
            <Route path="/jobdetail" element={<JobDetail />} />
            <Route path="/addjob" element={<AddJob />} />
            <Route path="/editjob" element={<EditJob />} />
            <Route path="/userpostedjoblist" element={<UserPostedJobList />} />
            <Route path="/jobtypesetup" element={<JobTypeSetup />} />
            <Route path="/jobapplication" element={<JobApplication />} />
            <Route
              path="/jobapplicationhistory"
              element={<JobApplicationHitory />}
            />
            {/* ------------------------------SetupManagement--------------------------- */}
            <Route
              path="/specializationsetup"
              element={<SpecializationSetup />}
            />
            <Route path="/statesetup" element={<StateSetup />} />
            {/* ------------------------------SetupManagement--------------------------- */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
