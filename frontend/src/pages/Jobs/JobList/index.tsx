import React, { useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import JobListComponent from "../../../components/JobListComponent";
import useJobListService from "./service";

function JobList() {
  const { jobData, goToAddJob, userRole } = useJobListService();
  return (
    <div>
      <Box style={{ padding: "15px 0px" }}>
        <Box style={{ display: "flex", justifyContent: "space-around" }}>
          <Box style={{ width: "800px" }}>
            <TextField
              fullWidth
              label="Search"
              color="warning"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      // onClick={() => {
                      //   handleSubmitSearch();
                      // }}
                      edge="end"
                    >
                      <SearchIcon color="action" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box style={{ marginTop: "5px" }}>
            <Button variant="contained" size="large">
              Filter
            </Button>
          </Box>
          {userRole == "jobPoster" || userRole == "admin" ? (
            <Box style={{ marginTop: "5px" }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => goToAddJob()}
              >
                Add Job
              </Button>
            </Box>
          ) : (
            <></>
          )}
        </Box>
        <Box style={{ margin: "25px 0px" }}>
          {/* display the joblist component */}
          <JobListComponent data={jobData} />
        </Box>
      </Box>
    </div>
  );
}

export default JobList;
