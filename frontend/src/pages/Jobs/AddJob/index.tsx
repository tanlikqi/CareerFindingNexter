import {
  Box,
  Grid,
  Card,
  TextField,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Avatar,
  Input,
} from "@mui/material";
import React from "react";
import "./addjob.scss";
import AddIcon from "@mui/icons-material/Add";
import useAddJobService from "./service";
import RemoveIcon from "@mui/icons-material/Remove";
import { Controller } from "react-hook-form";
import CustomSelect from "../../../components/Select";
import { disablefont } from "../../../utils/Contants";

function AddJob() {
  const {
    closeJobReqModal,
    isJobReqModalVisible,
    showJobReqModal,
    handleOk,
    handleSubmit,
    control,
    getValues,
    handleFileChange,
    AddJobError,
    fileError,
    checkFile,
    handleCancel,
    closeJobDesModal,
    isJobDesModalVisible,
    showJobDesModal,
    appendDes,
    appendReq,
    fieldDes,
    fieldReq,
    removeDes,
    removeReq,
    jobTypeData,
    stateData,
    specialisationData,
  } = useAddJobService();
  return (
    <div>
      <form onSubmit={handleSubmit(handleOk)}>
        <Card
          style={{ padding: "60px 60px 0px 60px", marginTop: "15px" }}
          elevation={5}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box className="addjobBox" style={{ marginBottom: "20px" }}>
                <Controller
                  control={control}
                  name="companyLogoUrl"
                  render={({ field }) => (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        id="avatar-input"
                        style={{ display: "none" }}
                        onChange={(e: any) => handleFileChange(e)}
                        disabled
                      />
                      <label htmlFor="avatar-input">
                        <Avatar
                          alt="User Avatar"
                          src={
                            getValues("companyLogoUrl") instanceof File
                              ? URL.createObjectURL(getValues("companyLogoUrl"))
                              : getValues("companyLogoUrl") || ""
                          }
                          sx={{ width: 100, height: 100 }}
                        />
                        {fileError ? (
                          <div style={{ color: "#d32f2f", marginTop: "5px" }}>
                            File is required
                          </div>
                        ) : null}
                      </label>
                    </>
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className="addjobBox">
                <Controller
                  control={control}
                  name="companyName"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled
                      label="Company Name"
                      error={AddJobError.companyName?.message ? true : false}
                      helperText={
                        AddJobError.companyName?.message
                          ? (AddJobError.companyName
                              ?.message as React.ReactNode)
                          : false
                      }
                      sx={disablefont}
                      variant="filled"
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className="addjobBox">
                <Controller
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Job Title"
                      error={AddJobError.title?.message ? true : false}
                      helperText={
                        AddJobError.title?.message
                          ? (AddJobError.title?.message as React.ReactNode)
                          : false
                      }
                      variant="filled"
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className="addjobBox">
                <Controller
                  control={control}
                  name="jobType"
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      label={"Job Type"}
                      defaultOption={"Please Select A Job Type"}
                      listItem={jobTypeData}
                      error={AddJobError.jobType?.message ? true : false}
                      helperText={
                        AddJobError.jobType?.message
                          ? (AddJobError.jobType?.message as React.ReactNode)
                          : false
                      }
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className="addjobBox">
                <Controller
                  control={control}
                  name="specialisation"
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      label={"Specialisation"}
                      defaultOption={"Please Select A Specialisation"}
                      listItem={specialisationData}
                      error={AddJobError.jobType?.message ? true : false}
                      helperText={
                        AddJobError.jobType?.message
                          ? (AddJobError.jobType?.message as React.ReactNode)
                          : false
                      }
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className="addjobBox">
                <Controller
                  control={control}
                  name="state"
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      label="State"
                      defaultOption={"Please Select A State"}
                      listItem={stateData}
                      error={AddJobError.state?.message ? true : false}
                      helperText={
                        AddJobError.state?.message
                          ? (AddJobError.state?.message as React.ReactNode)
                          : false
                      }
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className="addjobBox">
                <Controller
                  control={control}
                  name="experience"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Experience"
                      error={AddJobError.experience?.message ? true : false}
                      helperText={
                        AddJobError.experience?.message
                          ? (AddJobError.experience?.message as React.ReactNode)
                          : false
                      }
                      variant="filled"
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className="addjobBox">
                <Controller
                  control={control}
                  name="salary"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Salary"
                      error={AddJobError.salary?.message ? true : false}
                      helperText={
                        AddJobError.salary?.message
                          ? (AddJobError.salary?.message as React.ReactNode)
                          : false
                      }
                      variant="filled"
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className="addjobBox">
                <Controller
                  control={control}
                  name="location"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Location"
                      error={AddJobError.location?.message ? true : false}
                      helperText={
                        AddJobError.location?.message
                          ? (AddJobError.location?.message as React.ReactNode)
                          : false
                      }
                      variant="filled"
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className="addjobBox">
                <Button variant="contained" onClick={() => showJobReqModal()}>
                  Add Job Requirements
                </Button>
                {AddJobError.jobRequirements ? (
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#d32f2f",
                      marginTop: "5px",
                    }}
                  >
                    Job Requirement is a required field
                  </div>
                ) : (
                  <></>
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className="addjobBox">
                <Button variant="contained" onClick={() => showJobDesModal()}>
                  Add Job Description
                </Button>
                {AddJobError.jobDescriptions ? (
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#d32f2f",
                      marginTop: "5px",
                    }}
                  >
                    Job Description is a required field
                  </div>
                ) : (
                  <></>
                )}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "end",
                  margin: "30px 0px 20px 0px",
                }}
              >
                <Button
                  variant="contained"
                  style={{ marginRight: "10px" }}
                  type="submit"
                  onClick={() => checkFile()}
                >
                  Save
                </Button>
                <Button variant="contained" onClick={() => handleCancel()}>
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </form>
      <Dialog open={isJobReqModalVisible} onClose={closeJobReqModal} fullWidth>
        <DialogTitle>Job Requirements</DialogTitle>
        <DialogContent>
          {fieldReq.map((field, index) => (
            <Box className="jobReqBox" key={index}>
              <Controller
                control={control}
                name={`jobRequirements.${index}.jobRequirementContent`}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Job Requirements"
                    fullWidth
                    rows={3}
                    multiline
                    error={!!error}
                    helperText={
                      error ? (error?.message as unknown as string) : ""
                    }
                  />
                )}
              />

              <IconButton
                onClick={() => {
                  appendReq({
                    jobRequirementContent: "",
                  });
                }}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  console.log(index);
                  removeReq(index);
                }}
              >
                <RemoveIcon />
              </IconButton>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeJobReqModal()}>OK</Button>
        </DialogActions>
      </Dialog>
      {/*  */}
      <Dialog open={isJobDesModalVisible} onClose={closeJobDesModal} fullWidth>
        <DialogTitle>Job Description</DialogTitle>
        <DialogContent>
          {fieldDes.map((field, index) => (
            <Box className="jobReqBox" key={index}>
              <Controller
                control={control}
                name={`jobDescriptions.${index}.jobDescriptionContent`}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Job Description"
                    fullWidth
                    rows={3}
                    multiline
                    error={!!error}
                    helperText={
                      error ? (error?.message as unknown as string) : ""
                    }
                  />
                )}
              />

              <IconButton
                onClick={() => {
                  appendDes({
                    jobRequirementContent: "",
                  });
                }}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  console.log(index);
                  removeDes(index);
                }}
              >
                <RemoveIcon />
              </IconButton>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeJobDesModal()}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddJob;
