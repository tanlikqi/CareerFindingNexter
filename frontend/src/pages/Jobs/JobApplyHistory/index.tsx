import React from "react";
import useJobApplicationHistoryService from "./service";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import { baseURL } from "../../../utils/Contants";

function JobApplicationHitory() {
  const { resume, jobAppHistoryDetail } = useJobApplicationHistoryService();
  return (
    <div>
      <div>Job Application History</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {jobAppHistoryDetail.map((value: any) => {
          return (
            <>
              <Card
                style={{ margin: " 20px auto", width: "50%" }}
                elevation={7}
                // onClick={() =>
                //   viewResumeDetail(value.description, value.resume)
                // }
                className="card"
              >
                <CardContent>
                  <Box
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box>
                      <Typography
                        style={{
                          fontSize: "18px",
                          margin: "10px",
                        }}
                      >
                        Job Title: <b>{value.jobTitle}</b>
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "18px",
                          margin: "10px",
                        }}
                      >
                        Company Name: <b>{value.companyName}</b>
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "18px",
                          margin: "10px",
                        }}
                      >
                        Company Email: <b>{value.companyEmail}</b>
                      </Typography>
                    </Box>
                    <Box>
                      <img
                        src={value.companyLogoUrl}
                        style={{
                          height: "100px",
                          width: "170px",
                          marginRight: "15px",
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <Box>
                      {value.status == "REJECT" ? (
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
                      ) : (
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
                      )}
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
                        {format(parseISO(value.applyDt), "yyyy/MM/dd")}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </>
          );
        })}
      </div>
      {/* <Dialog open={isModalVisible} onClose={handleCancel}>
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
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          color="warning"
          style={{ marginRight: "10px" }}
        >
          Reject
        </Button>
        <Button variant="outlined" color="warning">
          Confirm
        </Button>
      </Box>
    </DialogContent>
    <DialogActions
      style={{
        color: "#ed6c02",
        cursor: "pointer",
        textTransform: "uppercase",
      }}
      onClick={() => {
        handleCancel();
      }}
    >
      Cancel
    </DialogActions>
  </Dialog> */}
    </div>
  );
}

export default JobApplicationHitory;
