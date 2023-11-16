import React from "react";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import { checkAuthentication } from "../../utils/checkAuthentication";

function MainLayout() {
  checkAuthentication();
  return (
    <>
      <Header />
      <Container sx={{ margin: "0.5em 0 0.5rem 0" }} maxWidth={false}>
        <Outlet />
      </Container>
      {/* <Box>
        <Outlet />
      </Box> */}
      <>Im am Footer</>
    </>
  );
}

export default MainLayout;
