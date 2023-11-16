import { Box, Card, IconButton, Typography, Grid } from "@mui/material";
import "./job.scss";
import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../utils/Contants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import axios from "axios";
import { deleteJob } from "../../api/job";
import calculateAgeFromDate from "../../utils/formateDate";

interface IProps {
  data?: any;
  isEditing?: boolean;
  isDeleting?: boolean;
  handleDelete?: any;
}

function JobListComponent({
  data,
  isEditing,
  isDeleting,
  handleDelete,
}: IProps) {
  // const tesData = [
  //   { id: 1 },
  //   { id: 2 },
  //   { id: 1 },
  //   { id: 2 },
  //   { id: 1 },
  //   { id: 2 },
  //   { id: 1 },
  //   { id: 2 },
  //   { id: 1 },
  //   { id: 2 },
  //   { id: 1 },
  //   { id: 2 },
  // ];
  if (!data) {
    return (
      <>
        <p>Loading</p>
      </>
    );
  }
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the data to display only the items for the current page
  const displayedData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  function formatPostedDate(isoDate: any) {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  }

  const navigate = useNavigate();

  const goToJobDetail = (jobId: any) => {
    navigate("/jobdetail", { state: { jobId } });
  };

  const goToEditPage = (jobId: any) => {
    navigate("/editjob", { state: { jobId } });
  };

  return (
    <>
      <Box className="jobContainer">
        {displayedData.map((value: any) => {
          return (
            <div>
              <Box className="btnBox">
                {isEditing ? (
                  <IconButton
                    size="large"
                    style={{ padding: "0px" }}
                    onClick={() => goToEditPage(value.jobId)}
                  >
                    <EditIcon />
                  </IconButton>
                ) : null}{" "}
                {isDeleting ? (
                  <IconButton
                    size="large"
                    style={{ padding: "0px", marginLeft: "20px" }}
                    onClick={() => handleDelete(value.jobId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : null}
              </Box>
              <Card
                key={value.jobId}
                className="jobitem"
                elevation={7}
                onClick={() => goToJobDetail(value.jobId)}
              >
                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <Box>
                      <Box style={{ margin: "15px 0px 50px 15px" }}>
                        <Typography className="jobItemtitle">
                          {value.title}
                        </Typography>
                      </Box>

                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          margin: "0px 0px 10px 10px",
                        }}
                      >
                        <AttachMoneyIcon color="action" />
                        <Typography
                          style={{
                            marginRight: "60px",
                            marginTop: "2px",
                            fontSize: "13px",
                          }}
                        >
                          {value.salary}
                        </Typography>
                        <LocationOnIcon />
                        <Typography
                          style={{ marginRight: "10px", fontSize: "13px" }}
                        >
                          {value.state}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={7}>
                    <Box
                      style={{
                        display: "flex",
                        margin: "20px 10px 0px 40px",
                        justifyContent: "space-around",
                      }}
                    >
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
                      <Box>
                        <Typography className="jobItemtitle">
                          {value.companyName}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      style={{
                        backgroundColor: "#e6e6e6",
                        width: "auto",
                        height: "50px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography className="jobTypeText">
                        {value.jobType}
                      </Typography>
                      <Typography className="joItemMinorText">
                        Posted {calculateAgeFromDate(value.postedDt)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </div>
          );
        })}
      </Box>
      <Box className="pagination">
        <IconButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ArrowBackIosIcon color={currentPage === 1 ? "action" : "warning"} />
        </IconButton>
        <Typography className="paginationText">
          Page {currentPage} of {totalPages}
        </Typography>
        <IconButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          <ArrowForwardIosIcon
            color={
              currentPage === totalPages || totalPages === 0
                ? "action"
                : "warning"
            }
          />
        </IconButton>
      </Box>
    </>
  );
}
export default JobListComponent;
