import React from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import JobListComponent from "../../../components/JobListComponent";
import useUserPostedJobList from "./service";
import { Typography } from "@material-ui/core";
function UserPostedJobList() {
  const {
    jobData,
    goToAddJob,
    handleDelete,
    handleSubmitSearch,
    handleSearch,
    searchInput,
  } = useUserPostedJobList();

  return (
    <div>
      <Box style={{ padding: "15px 0px" }}>
        <Box style={{ display: "flex", justifyContent: "space-around" }}>
          <Box style={{ width: "800px" }}>
            <TextField
              value={searchInput}
              fullWidth
              label="Search"
              color="warning"
              onChange={(e: any) => {
                handleSearch(e);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        handleSubmitSearch();
                      }}
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
          <Box style={{ marginTop: "5px" }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => goToAddJob()}
            >
              Add Job
            </Button>
          </Box>
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              textTransform: "uppercase",
            }}
          >
            Job List Posted By You
          </Typography>
        </Box>
        <Box style={{ margin: "25px 0px" }}>
          {/* display the joblist component */}
          <JobListComponent
            data={jobData}
            isEditing={true}
            isDeleting={true}
            handleDelete={handleDelete}
            searchInputs={searchInput}
          />
        </Box>
      </Box>
    </div>
  );
}

export default UserPostedJobList;
