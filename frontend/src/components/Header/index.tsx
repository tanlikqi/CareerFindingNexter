import {
  Box,
  CssBaseline,
  Drawer,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import useHeaderService from "./service";
import "./headerStyle.scss";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import "./headerStyle.scss";

function Header() {
  const {
    menuOpen,
    setMenuOpen,
    logout,
    handleDrawerClose,
    open,
    handleDrawerOpen,
    gotoDashBoard,
    menu,
    goToPage,
    userName,
    goToProfile,
    userRole,
    goToJobApplication,
  } = useHeaderService();
  const drawerWidth = 240;

  const Main = styled("main", {
    shouldForwardProp: (prop) => prop !== "open",
  })<{
    open?: boolean;
  }>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }));

  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  let menuRef: any = useRef();
  useEffect(() => {
    let handler = (e: any) => {
      if (!menuRef.current?.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const theme = useTheme();

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          className="header"
          position="relative"
          // open={open}
          style={{ backgroundColor: "#ffdab3", height: "70px" }}
        >
          <Box
            display={"flex"}
            flex={"auto"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid container spacing={2}>
              <Grid item xs={0.7}>
                <IconButton
                  color="default"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    mr: 2,
                    ...(open && { display: "none" }),
                    marginLeft: "9px",
                  }}
                  size="large"
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item xs={2}>
                {/* <IconButton>
                  <img height="50px" src={logo} />
                </IconButton> */}
                <Typography
                  className="titleName"
                  onClick={() => gotoDashBoard()}
                >
                  Nexter
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <div>
                  <Box
                    style={{
                      position: "absolute",
                      right: "90px",
                      top: "20px",
                    }}
                  >
                    <Typography style={{ color: "grey", fontWeight: "bold" }}>
                      {userName}
                    </Typography>
                  </Box>
                  <Box
                    ref={menuRef}
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "10px",
                    }}
                  >
                    <IconButton
                      className="menu-trigger"
                      onClick={() => {
                        setMenuOpen(!menuOpen);
                      }}
                    >
                      <AccountCircle />
                    </IconButton>
                    <div
                      className={`dropdown-menu ${
                        menuOpen ? "active" : "inactive"
                      }`}
                      style={{ top: "35px" }}
                    >
                      <Box className="menuItem">
                        <Box
                          className="menuItemList"
                          onClick={() => goToProfile()}
                        >
                          <Typography color="black" className="menuItemList">
                            Profile
                          </Typography>
                        </Box>
                        {userRole == "jobSeeker" ? (
                          <Box
                            className="menuItemList"
                            onClick={() => goToJobApplication()}
                          >
                            <Typography
                              color="black"
                              className="menuItemList"
                              style={{ textAlign: "center" }}
                            >
                              Job Application History
                            </Typography>
                          </Box>
                        ) : null}

                        <Box className="menuItemList" onClick={() => logout()}>
                          <Typography color="black" className="menuItemList">
                            Logout
                          </Typography>
                        </Box>
                      </Box>
                    </div>
                  </Box>
                </div>
              </Grid>
            </Grid>
          </Box>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              background: "#ffbb33",
              overflow: "hidden",
            },
          }}
          variant="temporary"
          anchor="left"
          open={open}
          onBackdropClick={handleDrawerClose}
        >
          <DrawerHeader>
            {/* <Box
              style={{
                margin: "-30px 2px -30px -5px",
              }}
            >
              <img
                style={{
                  height: "140px",
                  width: "190px",
                  paddingLeft: "10px",
                }}
                src={sideMenuLogo}
              />
            </Box> */}
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon sx={{ color: "white" }} />
              ) : (
                <ChevronRightIcon sx={{ color: "white" }} />
              )}
            </IconButton>
          </DrawerHeader>

          {/* Mapping Sidebar START */}

          <div className="sidebar-drawer">
            {menu.map((value: any) => {
              return (
                <div key={value.key}>
                  {value.showable == true ? (
                    <>
                      <Box
                        className="sidebarBox"
                        onClick={() => value.handleOpen()}
                      >
                        <Box>
                          <IconButton>{value.icon}</IconButton>
                        </Box>
                        <Box>
                          <Typography className="sidebarParentText">
                            {value.title}
                          </Typography>
                        </Box>
                      </Box>
                      {value.open == true ? (
                        <Box
                          className={`sublink ${
                            value.open ? "fade-in" : "fade-out"
                          }`}
                          key={value.key}
                        >
                          {value.subMenu.map((value: any) => {
                            return (
                              <>
                                {value.showable == true ? (
                                  <Box
                                    className="sidebarChildBox"
                                    onClick={() => goToPage(value.path)}
                                  >
                                    <Typography className="sidebarChildText">
                                      {value.title}
                                    </Typography>
                                  </Box>
                                ) : null}
                              </>
                            );
                          })}
                        </Box>
                      ) : null}
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Mapping Sidebar END */}
        </Drawer>

        <Main open={open} sx={{ padding: "5px" }}>
          <DrawerHeader />
        </Main>
      </Box>
    </div>
  );
}

export default Header;
