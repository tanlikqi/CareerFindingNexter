import {
  Box,
  Paper,
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React from "react";
import "./loginStyle.scss";
import useLoginService from "./service";
import logo from "../../../assets/img/logo.png";
import { Controller } from "react-hook-form";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const { handleSignUp, handleSubmit, control, handleOk, loginError } =
    useLoginService();
  return (
    <div className="background">
      <CssBaseline />
      <Box className="loginBox">
        <Card elevation={9}>
          <CardContent>
            <Box style={{ textAlign: "center" }}>
              <img src={logo} alt="Logo" className="login-logo " />
            </Box>
            <Box className="loginPrimaryTitleBox">
              <Typography className="loginPrimaryTitle">
                Welcome to Nexter
              </Typography>
            </Box>
            <Box className="loginSecondaryTitleBox">
              <Typography
                className="loginSecondaryTitle"
                style={{ fontWeight: "300", fontSize: "16px" }}
              >
                Log In
              </Typography>
            </Box>
            <form onSubmit={handleSubmit(handleOk)}>
              <Box className="login_user_input_box">
                <Controller
                  control={control}
                  name="userName"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="login_user_input"
                      label="Username"
                      name="userName"
                      error={loginError.userName?.message ? true : false}
                      helperText={
                        loginError.userName?.message
                          ? loginError.userName?.message
                          : false
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type={showPassword ? "text" : "password"}
                      className="login_user_input"
                      label="Password"
                      name="password"
                      error={loginError.password?.message ? true : false}
                      helperText={
                        loginError.password?.message
                          ? loginError.password?.message
                          : false
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Box>
              <Box className="btn">
                <Button
                  fullWidth={true}
                  variant="contained"
                  color="warning"
                  type="submit"
                >
                  LogIn
                </Button>
              </Box>
            </form>
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
              <Box className="btn-sub">
                <Button
                  size="small"
                  onClick={() => handleSignUp()}
                  color="inherit"
                  style={{ textDecoration: "underline" }}
                >
                  Dont have account
                </Button>
              </Box>

              <Box className="btn-sub">
                <Button
                  size="small"
                  style={{ textDecoration: "underline" }}
                  color="inherit"
                >
                  Forget Password
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default Login;
