import { Box, Button, Paper, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import "./carousel.scss";

interface IProps {
  data?: any;
  onChangeCarousel?: any;
}

function CarouselComponent({ data, onChangeCarousel }: IProps) {
  return (
    <>
      <Carousel
        className="carousel"
        animation="slide"
        indicators={true}
        autoPlay={true}
        onChange={onChangeCarousel} // Capture the current item index
        navButtonsProps={{
          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
          style: {
            backgroundColor: "orange",
            borderRadius: "25px",
          },
        }}
      >
        {data.map((item: any, i: any) => {
          return (
            <Box className="carouselcard" key={i}>
              <Paper
                key={i}
                style={{
                  padding: "10px",
                  backgroundImage: `url('${item.image}')`,
                  backgroundColor: "black",
                  height: "600px",
                  maxHeight: "600px",
                  backgroundSize: "cover",
                }}
              >
                <Box style={{ marginTop: "250px" }}>
                  <Typography className="carouselcardtitle">
                    {item.title}
                  </Typography>
                  <Typography className="carouselcarddes">
                    {item.description}
                  </Typography>
                  <Button className="carouselcardBtn">
                    <Typography className="carouselcardBtnText">
                      {item.btnText}
                    </Typography>
                  </Button>
                </Box>
              </Paper>
            </Box>
          );
        })}
      </Carousel>
    </>
  );
}

export default CarouselComponent;
