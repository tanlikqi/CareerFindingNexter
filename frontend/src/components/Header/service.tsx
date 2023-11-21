import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkIcon from "@mui/icons-material/Work";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

export default function useHeaderService() {
  const userName = localStorage.getItem("userName");

  const userRole = localStorage.getItem("userRole");

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const [openAccManagement, setOpenAccManagement] = useState(false);

  const [openJobManagement, setOpenJobManagement] = useState(false);

  const [openSetupManagement, setOpenSetupManagement] = useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenAccountManagement = () => {
    setOpenAccManagement(!openAccManagement);
  };

  const handleOpenJobMangement = () => {
    setOpenJobManagement(!openJobManagement);
  };

  const handleOpenSetupManagement = () => {
    setOpenSetupManagement(!openSetupManagement);
  };

  const logout = () => {
    navigate("/");
    localStorage.clear();
    sessionStorage.clear();
  };

  const gotoDashBoard = () => {
    navigate("/dashboard");
  };

  const goToProfile = () => {
    navigate("/profile");
    setMenuOpen(false);
  };

  const goToPage = (e: any) => {
    navigate(e);
    setOpen(false);
  };

  const goToJobApplication = () => {
    navigate("/jobapplicationhistory");
    setMenuOpen(false);
  };

  const menu = [
    {
      key: 1,
      title: "Account Management",
      handleOpen: handleOpenAccountManagement,
      open: openAccManagement,
      icon: <SupervisedUserCircleIcon />,
      showable: userRole == "admin" ? true : false,
      subMenu: [
        {
          subkey: 1.01,
          title: "User Management",
          path: "/dashboard",
          showable: userRole == "admin" ? true : false,
        },
      ],
    },
    {
      key: 2,
      title: "Job Management",
      handleOpen: handleOpenJobMangement,
      open: openJobManagement,
      icon: <WorkIcon />,
      showable: true,
      subMenu: [
        {
          subkey: 2.01,
          title: "Add Job",
          path: "/addjob",
          showable: userRole == "jobPoster" ? true : false,
        },
        { subkey: 2.02, title: "Job List", path: "/joblist", showable: true },
        {
          subkey: 2.03,
          title: "User Posted Job List",
          path: "/userpostedjoblist",
          showable: userRole == "jobPoster" ? true : false,
        },
        {
          subkey: 2.04,
          title: "Job Application",
          path: "/jobapplication",
          showable: userRole == "jobPoster" ? true : false,
        },
        {
          subkey: 2.05,
          title: "Job Application History",
          path: "/jobapplicationhistory",
          showable: userRole == "jobSeeker" ? true : false,
        },
      ],
    },
    {
      key: 3,
      title: "Setup Management",
      handleOpen: handleOpenSetupManagement,
      open: openSetupManagement,
      icon: <WorkIcon />,
      showable: userRole == "admin" ? true : false,
      subMenu: [
        {
          subkey: 3.01,
          title: "JobType Setup",
          path: "/jobtypesetup",
          showable: userRole == "admin" ? true : false,
        },
        {
          subkey: 3.02,
          title: "Specialization Setup",
          path: "/specializationsetup",
          showable: userRole == "admin" ? true : false,
        },
        {
          subkey: 3.03,
          title: "State Setup",
          path: "/statesetup",
          showable: userRole == "admin" ? true : false,
        },
        {
          subkey: 3.04,
          title: "Experience Setup",
          path: "/experiencesetup",
          showable: userRole == "admin" ? true : false,
        },
      ],
    },
  ];

  return {
    handleMenu,
    anchorEl,
    handleClose,
    setMenuOpen,
    menuOpen,
    logout,
    handleDrawerClose,
    handleDrawerOpen,
    open,
    gotoDashBoard,
    menu,
    goToPage,
    userName,
    goToProfile,
    userRole,
    goToJobApplication,
  };
}
