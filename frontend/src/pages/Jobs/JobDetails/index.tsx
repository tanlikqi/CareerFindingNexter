import React from "react";
import useJobDetailService from "./service";
import { baseURL, disablefont } from "../../../utils/Contants";
import "./jobDetail.scss";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import calculateAgeFromDate from "../../../utils/formateDate";
import { Controller } from "react-hook-form";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
function JobDetail() {
  const {
    jobdetail,
    handleCloseModal,
    handleOpenModal,
    isModalVisible,
    control,
    handleOk,
    handleSubmit,
    errors,
    userRole,
    checkFile,
    fileError,
    handleFileChange,
    isMatch,
    disableApply,
  } = useJobDetailService();

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Box style={{ display: "flex" }}>
              <img src={jobdetail.companyLogoUrl} className="logo" />
              <Box style={{ marginLeft: "20px", marginTop: "20px" }}>
                <Typography className="primaryTitle">
                  {jobdetail.title}
                </Typography>
                <Typography className="companyName">
                  {jobdetail.companyName}
                </Typography>
              </Box>
            </Box>

            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              {isMatch}
              {/* {userRole == "jobSeeker" ? (
                <Button
                  variant="contained"
                  onClick={() => {
                    handleOpenModal();
                  }}
                >
                  Apply
                </Button>
              ) : null} */}
              {userRole == "jobSeeker" ? (
                isMatch || disableApply ? (
                  <>
                    <Box
                      style={{
                        display: "flex",
                        backgroundColor: "#ccffcc",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px",
                        borderRadius: "10px",
                        border: "2px solid green",
                        color: "green",
                        textTransform: "uppercase",
                      }}
                    >
                      <Box>Applied</Box>
                      <Box style={{ marginTop: "3px", marginLeft: "2px" }}>
                        <CheckCircleOutlineIcon />
                      </Box>
                    </Box>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleOpenModal();
                      }}
                    >
                      Apply
                    </Button>
                  </>
                )
              ) : null}
              <Card style={{ width: "500px" }}>
                <CardContent>
                  <Box className="infoCard">
                    <AttachMoneyIcon />
                    <Typography>{jobdetail.salary}</Typography>
                  </Box>
                  <Box className="infoCard">
                    <LocationOnIcon />
                    <Typography>{jobdetail.location}</Typography>
                  </Box>
                  <Box className="infoCard-second">
                    <Box
                      style={{ backgroundColor: "#ffbf80", padding: "10px" }}
                    >
                      <Typography
                        style={{ color: "#cc5200", fontWeight: "bold" }}
                      >
                        {jobdetail.jobType}
                      </Typography>
                    </Box>
                    <Typography style={{ marginTop: "10px" }}>
                      Posted {calculateAgeFromDate(jobdetail.postedDt)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography className="jobRequirements">
              Job Descriptions
            </Typography>

            {jobdetail.description.map((item, index) => {
              return (
                <div style={{ marginTop: "10px" }} key={index}>
                  <li key={index}> {item.jobDescriptionContent}</li>
                </div>
              );
            })}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography className="jobRequirements">
              Job Requirements
            </Typography>
            {jobdetail.requirement.map((item, index) => {
              return (
                <div style={{ marginTop: "10px" }} key={index}>
                  <li key={index}>{item.jobRequirementContent}</li>
                </div>
              );
            })}
          </Box>
        </Grid>
      </Grid>
      <Dialog open={isModalVisible} onClose={handleCloseModal} fullWidth>
        <DialogTitle fontWeight="bold">Job Application</DialogTitle>
        <DialogContent>
          <Box style={{ marginTop: "20px" }}>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "15px 0px",
              }}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    style={{ marginRight: "10px" }}
                    error={errors.email?.message ? true : false}
                    helperText={
                      errors.email?.message
                        ? (errors.email?.message as React.ReactNode)
                        : false
                    }
                  />
                )}
              />
              <Controller
                name="phoneNo"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Phone Number" fullWidth />
                )}
              />
            </Box>

            <TextField
              value={jobdetail.companyName}
              label="Company Name"
              fullWidth
              style={{ margin: "15px 0px" }}
              disabled
              sx={disablefont}
            />

            <Controller
              name="jobTitle"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Job Title"
                  fullWidth
                  style={{ margin: "15px 0px" }}
                  disabled
                  sx={disablefont}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  multiline
                  rows={4}
                  label="Why you want to join us"
                  fullWidth
                  style={{ margin: "15px 0px" }}
                  error={errors.description?.message ? true : false}
                  helperText={
                    errors.description?.message
                      ? (errors.description?.message as React.ReactNode)
                      : false
                  }
                />
              )}
            />
            <Typography style={{ fontSize: "14px", marginBottom: "10px" }}>
              Upload Your Resume
            </Typography>
            <Controller
              name="resume"
              control={control}
              render={({ field }) => (
                // <TextField
                //   {...field}
                //   fullWidth
                //   label="File Uplaoder Resume"
                //   style={{ margin: "15px 0px" }}
                // />
                <input
                  // {...field}
                  type="file"
                  onChange={(e: any) => handleFileChange(e)}
                />
              )}
            />
            {fileError ? (
              <div
                style={{
                  color: "#d32f2f",
                  marginTop: "6px",
                  fontSize: "12px",
                  marginLeft: "12px",
                }}
              >
                File is required
              </div>
            ) : null}
          </Box>
        </DialogContent>
        <form onSubmit={handleSubmit(handleOk)}>
          <DialogActions>
            <Button
              type="submit"
              onClick={() => {
                checkFile();
              }}
            >
              Submit
            </Button>
            <Button
              onClick={() => {
                handleCloseModal();
              }}
            >
              Close
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default JobDetail;
