import React, { useEffect, useState } from "react";
import { getAlljobApplication } from "../../../api/job";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import useJobApplicationService from "./service";
import "./jobApplication.scss";
import { disablefont } from "../../../utils/Contants";
import { TabContext, TabList, TabPanel } from "@mui/lab";

function JobApplication() {
  const {
    resume,
    handleCancel,
    isModalVisible,
    viewResumeDetail,
    description,
    resumeLink,
    handleStatusJobApp,
    jobAppId,
    jobStatus,
  } = useJobApplicationService();

  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue("1");
  }, []);
  return (
    <div>
      <div>Job Application</div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Tab label="awaiting confirmation / Rejection" value="1" />
              <Tab label="Confirm" value="2" />
              <Tab label="Reject" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {resume.map((value: any) => {
                return (
                  <div key={value.jobApplicationId}>
                    {value.status == "PENDING" || value.status == "VIEWED" ? (
                      <Card
                        style={{ margin: " 20px auto", width: "50%" }}
                        elevation={7}
                        onClick={() =>
                          viewResumeDetail(
                            value.description,
                            value.resume,
                            value.jobApplicationId,
                            value.status
                          )
                        }
                        className="card"
                      >
                        <CardContent>
                          <Box
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Typography
                              style={{
                                fontSize: "18px",
                                margin: "10px",
                              }}
                            >
                              Job Title:&nbsp;
                              <b>{value.jobTitle}</b>
                            </Typography>
                            <Typography
                              style={{
                                fontSize: "18px",
                                margin: "10px",
                              }}
                            >
                              Applicant Name: <b>{value.applicantName}</b>
                            </Typography>
                            <Typography
                              style={{
                                fontSize: "18px",
                                margin: "10px",
                              }}
                            >
                              Applicant Email: <b>{value.applicantEmail}</b>
                            </Typography>
                            <Typography
                              style={{
                                fontSize: "18px",
                                margin: "10px",
                              }}
                            >
                              Applicant PhoneNo: <b>{value.applicantPhoneno}</b>
                            </Typography>
                            <Box
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "row",
                              }}
                            >
                              <Box>
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
                                  }}
                                >
                                  <Box>{value.status}</Box>
                                </Box>
                              </Box>
                              <Box>
                                <Typography
                                  style={{
                                    fontSize: "14px",
                                    // fontWeight: "700",
                                    alignSelf: "end",
                                  }}
                                >
                                  Application Date:
                                </Typography>
                                <Typography
                                  style={{
                                    fontSize: "14px",
                                    // fontWeight: "700",
                                    alignSelf: "end",
                                  }}
                                >
                                  {format(
                                    parseISO(value.applyDt),
                                    "yyyy/MM/dd"
                                  )}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {resume.map((value: any) => {
                return (
                  <div key={value.jobApplicationId}>
                    {value.status == "CONFIRM" ? (
                      <Card
                        style={{ margin: " 20px auto", width: "50%" }}
                        elevation={7}
                        onClick={() =>
                          viewResumeDetail(
                            value.description,
                            value.resume,
                            value.jobApplicationId,
                            value.status
                          )
                        }
                        className="card"
                      >
                        <CardContent>
                          <Box
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Typography
                              style={{
                                fontSize: "18px",
                                margin: "10px",
                              }}
                            >
                              Job Title:&nbsp;
                              <b>{value.jobTitle}</b>
                            </Typography>
                            <Typography
                              style={{
                                fontSize: "18px",
                                margin: "10px",
                              }}
                            >
                              Applicant Name: <b>{value.applicantName}</b>
                            </Typography>
                            <Typography
                              style={{
                                fontSize: "18px",
                                margin: "10px",
                              }}
                            >
                              Applicant Email: <b>{value.applicantEmail}</b>
                            </Typography>
                            <Typography
                              style={{
                                fontSize: "18px",
                                margin: "10px",
                              }}
                            >
                              Applicant PhoneNo: <b>{value.applicantPhoneno}</b>
                            </Typography>
                            <Box
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "row",
                              }}
                            >
                              <Box>
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
                                  }}
                                >
                                  <Box>{value.status}</Box>
                                </Box>
                              </Box>
                              <Box>
                                <Typography
                                  style={{
                                    fontSize: "14px",
                                    // fontWeight: "700",
                                    alignSelf: "end",
                                  }}
                                >
                                  Application Date:
                                </Typography>
                                <Typography
                                  style={{
                                    fontSize: "14px",
                                    // fontWeight: "700",
                                    alignSelf: "end",
                                  }}
                                >
                                  {format(
                                    parseISO(value.applyDt),
                                    "yyyy/MM/dd"
                                  )}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </div>
          </TabPanel>
          <TabPanel value="3">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {resume.map((value: any) => {
                return (
                  <div key={value.jobApplicationId}>
                    {value.status == "REJECT" ? (
                      <Card
                        style={{ margin: " 20px auto", width: "50%" }}
                        elevation={7}
                        onClick={() =>
                          viewResumeDetail(
                            value.description,
                            value.resume,
                            value.jobApplicationId,
                            value.status
                          )
                        }
                        className="card"
                      >
                        <CardContent>
                          <Box
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Typography
                              style={{
                                fontSize: "18px",
                                margin: "10px",
                              }}
                            >
                              Job Title:&nbsp;
                              <b>{value.jobTitle}</b>
                            </Typography>

                            <Typography
                              style={{
                                fontSize: "18px",
                                margin: "10px",
                              }}
                            >
                              Applicant Name: <b>{value.applicantName}</b>
                            </Typography>
                            <Typography
                              style={{
                                fontSize: "18px",
                                margin: "10px",
                              }}
                            >
                              Applicant Email: <b>{value.applicantEmail}</b>
                            </Typography>
                            <Typography
                              style={{
                                fontSize: "18px",
                                margin: "10px",
                              }}
                            >
                              Applicant PhoneNo: <b>{value.applicantPhoneno}</b>
                            </Typography>
                            <Box
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "row",
                              }}
                            >
                              <Box>
                                <Box
                                  style={{
                                    display: "flex",
                                    backgroundColor: "#ffcccc",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "10px",
                                    borderRadius: "10px",
                                    border: "2px solid red",
                                    color: "red",
                                  }}
                                >
                                  <Box>{value.status}</Box>
                                </Box>
                              </Box>
                              <Box>
                                <Typography
                                  style={{
                                    fontSize: "14px",
                                    // fontWeight: "700",
                                    alignSelf: "end",
                                  }}
                                >
                                  Application Date:
                                </Typography>
                                <Typography
                                  style={{
                                    fontSize: "14px",
                                    // fontWeight: "700",
                                    alignSelf: "end",
                                  }}
                                >
                                  {format(
                                    parseISO(value.applyDt),
                                    "yyyy/MM/dd"
                                  )}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </div>
          </TabPanel>
        </TabContext>
      </Box>

      <Dialog open={isModalVisible} onClose={handleCancel}>
        <DialogTitle>Resume Details</DialogTitle>
        <DialogContent>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "20px",
            }}
          >
            <TextField
              multiline
              maxRows={5}
              value={description}
              label="Description"
              style={{ marginBottom: "30px", width: "300px" }}
              disabled
              sx={disablefont}
            />
            <Typography style={{ fontSize: "14px", marginBottom: "5px" }}>
              Applicant Resume:
            </Typography>
            <a
              // style={{ textDecoration: "none" }}
              href={`http://localhost:8081/jobApplication/downloadPDF/?test=${resumeLink}`}
              download
            >
              {resumeLink}
            </a>
          </Box>
          {jobStatus == "PENDING" || jobStatus == "VIEWED" ? (
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="outlined"
                color="warning"
                style={{ marginRight: "10px" }}
                onClick={() => {
                  handleStatusJobApp(jobAppId, "REJECT");
                }}
              >
                Reject
              </Button>
              <Button
                variant="outlined"
                color="warning"
                onClick={() => {
                  handleStatusJobApp(jobAppId, "CONFIRM");
                }}
              >
                Confirm
              </Button>
            </Box>
          ) : null}
        </DialogContent>
        <DialogActions
          style={{
            color: "#ed6c02",
            cursor: "pointer",
            textTransform: "uppercase",
            margin: "5px",
          }}
          onClick={() => {
            handleCancel();
          }}
        >
          Cancel
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default JobApplication;
