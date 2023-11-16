import {
  Box,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import React from "react";
import "./dashboard.scss";
import ShopeeLogo from "../../assets/brands-logo/shopee.png";
import AmazonLogo from "../../assets/brands-logo/amazon.png";
import MichelinLogo from "../../assets/brands-logo/michelin.png";
import CelcomLogo from "../../assets/brands-logo/celcom_logo.png";
import McdLogo from "../../assets/brands-logo/mcd.png";
import NinjaVanLogo from "../../assets/brands-logo/ninja-van-logo.png";
import Dualingo from "../../assets/brands-logo/dualingo.png";
import ZusLogo from "../../assets/brands-logo/zus_logo.png";
import HDLLogo from "../../assets/brands-logo/haidilao.png";
import SearchIcon from "@mui/icons-material/Search";
import useDashBoardService from "./service";
import CarouselComponent from "../../components/Carousel";
function DashBoard() {
  const {
    handleSearchInput,
    searchInput,
    handleSubmitSearch,
    currentWord,
    textFieldref,
    searchIconState,
    trendingData,
    handleTrending,
    currentItemIndex,
    handleSlideChange,
  } = useDashBoardService();

  const items = [
    {
      title: "A Work Place That Just Feel Like Home!",
      description:
        "Ruma Home encourages open communication whereby everyone is free to voice out their opinions, suggestions or new ideas to help develop the company.",
      image:
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      btnText: "View Company",
    },
    {
      title: "60+ Positions on Aluhaha Bank!",
      description:
        "Competitive base salary. A suite of holistic, flexible benefits to suit every lifestyle. Community initiatives. Industry-leading learning and professional development opportunities",
      image:
        "https://images.unsplash.com/photo-1616803140344-6682afb13cda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      btnText: "View Now",
    },
    {
      title: "Accountant near Saluha Beach",
      description:
        "Come here to enjoy the best seaview while earning your income.",
      image:
        "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1968&q=80",
      btnText: "View Now",
    },
    {
      title: "Lorem ipsum dolor sit amet  iste.",
      description:
        "Amet consectetur adipisicing elit. Porro, culpa at labore minus perferendis consequatur totam consectetur sit impedit natus dolorum accusamus eligendi dolores vitae, fugit",
      image:
        "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      btnText: "View Now",
    },
    {
      title:
        " Voluptate inventore saepe, perferendis magnam iste expedita aut magni voluptatem libero, beatae nemo.",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate inventore saepe, perferendis magnam iste expedita aut magni voluptatem libero, beatae nemo. In earum mollitia nisi modi dicta quas voluptates fuga.",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      btnText: "View Company",
    },
  ];

  return (
    <div className="mainAnimation">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box style={{ marginTop: "40px" }}>
            <Box style={{ display: "flex" }}>
              <Box>
                <Typography className="bigTitle" marginRight="10px">
                  Find Your
                </Typography>
              </Box>
              <Box>
                <Typography className="bigTitleSecondary fade-in">
                  {currentWord}
                </Typography>
              </Box>
            </Box>
            <Box style={{ display: "flex" }}>
              <Box className="bigTitle">Job In</Box>
              <Box>
                <Typography className="nexterTitle">Nexter</Typography>
              </Box>
            </Box>
            <Box style={{ margin: "100px 0px 20px 0px" }}>
              <TextField
                className={`textfieldborder ${
                  searchIconState ? "active" : "inactive"
                }`}
                ref={textFieldref}
                value={searchInput}
                onChange={(e: any) => handleSearchInput(e)}
                placeholder="Search By Job Title, Company or Skill..... "
                fullWidth
                color="warning"
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
                        {searchIconState ? (
                          <SearchIcon color="warning" />
                        ) : (
                          <SearchIcon color="action" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box style={{ display: "flex" }}>
              <Box style={{ marginRight: "60px" }}>
                <Box className="trendingBox">
                  <Typography className="trendingtext">Trending</Typography>
                </Box>
              </Box>
              <Box>
                {trendingData.map((value: any) => {
                  return (
                    <Button
                      variant="contained"
                      className="trendingBtn"
                      value={value.name}
                      key={value.id}
                      size="small"
                      onClick={(e: any) => {
                        handleTrending(e);
                      }}
                    >
                      {value.name}
                    </Button>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box>
                  <img src={AmazonLogo} className="img-1" />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box>
                  <img src={ShopeeLogo} className="img-1" />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box>
                  <img src={MichelinLogo} className="img-2" />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box style={{ marginLeft: "60px", marginTop: "20px" }}>
                  <img src={ZusLogo} className="img-1" />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box style={{ marginLeft: "60px", marginTop: "20px" }}>
                  <img src={NinjaVanLogo} className="img-4 " />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box style={{ marginTop: "20px" }}>
                  <img src={CelcomLogo} className="img-3" />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box style={{ marginTop: "20px" }}>
                  <img src={McdLogo} className="img-1" />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box style={{ marginTop: "20px", marginLeft: "50px" }}>
                  <img src={Dualingo} className="img-3" />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box style={{ marginTop: "20px" }}>
                  <img src={HDLLogo} className="img-3" />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "100px 0px 10px 0px",
            }}
          >
            <CarouselComponent
              data={items}
              onChangeCarousel={handleSlideChange}
            />
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "100px",
            }}
          >
            {items.map((value: any, index: any) => {
              return (
                <div key={value.title}>
                  {currentItemIndex == index ? (
                    <Box
                      style={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: "orange",
                        margin: "2px",
                        borderRadius: "25px",
                      }}
                    ></Box>
                  ) : (
                    <Box
                      style={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: "#ccc",
                        margin: "2px",
                        borderRadius: "25px",
                      }}
                    ></Box>
                  )}
                </div>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default DashBoard;
