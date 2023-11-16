import React from "react";
import "./signupStyle.scss";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CssBaseline,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import useSignUpService from "./service";
import logo from "../../../assets/img/logo.png";
import { Controller } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function SignUp() {
  const {
    goToLogin,
    handleSubmit,
    handleOk,
    control,
    signupErrors,
    clearForm,
    handleCheckJobSeeker,
    isJobSeeker,
    handleCheckIsJobPoster,
    isJobPoster,
    backToOption,
    handleFileChange,
    fileError,
    getValues,
    checkFile,
  } = useSignUpService();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  let var1 = (
    <>
      <Box className="signup_user_input_box">
        <Box style={{ marginRight: "10px" }}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="signup_user_input"
                label="First Name"
                name="firstName"
                error={signupErrors.firstName?.message ? true : false}
                helperText={
                  signupErrors.firstName?.message ? (
                    <>{signupErrors.firstName?.message}</>
                  ) : (
                    false
                  )
                }
              />
            )}
          />
        </Box>
        <Box>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="signup_user_input"
                label="Last Name"
                name="lastName"
                error={signupErrors.lastName?.message ? true : false}
                helperText={
                  signupErrors.lastName?.message ? (
                    <>{signupErrors.lastName?.message}</>
                  ) : (
                    false
                  )
                }
              />
            )}
          />
        </Box>
      </Box>
      <Box className="signup_user_input_box">
        <Box style={{ marginRight: "10px" }}>
          <Controller
            name="userName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="signup_user_input"
                label="Username"
                name="userName"
                error={signupErrors.userName?.message ? true : false}
                helperText={
                  signupErrors.userName?.message ? (
                    <>{signupErrors.userName?.message}</>
                  ) : (
                    false
                  )
                }
              />
            )}
          />
        </Box>
        <Box>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="signup_user_input"
                label="Email"
                name="email"
                error={signupErrors.email?.message ? true : false}
                helperText={
                  signupErrors.email?.message ? (
                    <>{signupErrors.email?.message}</>
                  ) : (
                    false
                  )
                }
              />
            )}
          />
        </Box>
      </Box>
      <Box style={{ margin: "0px 115px" }}>
        <Controller
          name="phoneNo"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              className="signup_user_input"
              label="Phone No"
              name="phoneNo"
              error={signupErrors.phoneNo?.message ? true : false}
              helperText={
                signupErrors.phoneNo?.message ? (
                  <>{signupErrors.phoneNo?.message}</>
                ) : (
                  false
                )
              }
            />
          )}
        />
      </Box>
      <Box className="signup_user_input_box">
        <Box style={{ marginRight: "10px" }}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type={showPassword ? "text" : "password"}
                className="signup_user_input"
                label="Password"
                name="password"
                error={signupErrors.password?.message ? true : false}
                helperText={
                  signupErrors.password?.message ? (
                    <>{signupErrors.password?.message}</>
                  ) : (
                    false
                  )
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
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Box>
        <Box>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <TextField
                {...field}
                type={showConfirmPassword ? "text" : "password"}
                className="signup_user_input"
                label="Confirm Password"
                name="confirmPassword"
                error={signupErrors.confirmPassword?.message ? true : false}
                helperText={
                  signupErrors.confirmPassword?.message ? (
                    <>{signupErrors.confirmPassword?.message}</>
                  ) : (
                    false
                  )
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
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
      </Box>
      <form onSubmit={handleSubmit(handleOk)}>
        <Box className="btn_sign_up">
          <Button
            variant="contained"
            color="warning"
            fullWidth
            type="submit"
            style={{ margin: "0px 10px" }}
          >
            SignUp
          </Button>
          <Button
            variant="contained"
            color="warning"
            fullWidth
            onClick={() => clearForm()}
          >
            Reset
          </Button>
        </Box>
      </form>
    </>
  );

  let var2 = (
    <>
      <Box className="signup_user_input_box">
        <Box style={{ marginRight: "10px" }}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="signup_user_input"
                label="First Name"
                name="firstName"
                error={signupErrors.firstName?.message ? true : false}
                helperText={
                  signupErrors.firstName?.message ? (
                    <>{signupErrors.firstName?.message}</>
                  ) : (
                    false
                  )
                }
              />
            )}
          />
        </Box>
        <Box>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="signup_user_input"
                label="Last Name"
                name="lastName"
                error={signupErrors.lastName?.message ? true : false}
                helperText={
                  signupErrors.lastName?.message ? (
                    <>{signupErrors.lastName?.message}</>
                  ) : (
                    false
                  )
                }
              />
            )}
          />
        </Box>
      </Box>
      <Box className="signup_user_input_box">
        <Box style={{ marginRight: "10px" }}>
          <Controller
            name="userName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="signup_user_input"
                label="Username"
                name="userName"
                error={signupErrors.userName?.message ? true : false}
                helperText={
                  signupErrors.userName?.message ? (
                    <>{signupErrors.userName?.message}</>
                  ) : (
                    false
                  )
                }
              />
            )}
          />
        </Box>
        <Box>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="signup_user_input"
                label="Email"
                name="email"
                error={signupErrors.email?.message ? true : false}
                helperText={
                  signupErrors.email?.message ? (
                    <>{signupErrors.email?.message}</>
                  ) : (
                    false
                  )
                }
              />
            )}
          />
        </Box>
      </Box>
      <Box className="signup_user_input_box">
        <Box style={{ marginRight: "10px" }}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type={showPassword ? "text" : "password"}
                className="signup_user_input"
                label="Password"
                name="password"
                error={signupErrors.password?.message ? true : false}
                helperText={
                  signupErrors.password?.message ? (
                    <>{signupErrors.password?.message}</>
                  ) : (
                    false
                  )
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
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Box>
        <Box>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <TextField
                {...field}
                type={showConfirmPassword ? "text" : "password"}
                className="signup_user_input"
                label="Confirm Password"
                name="confirmPassword"
                error={signupErrors.confirmPassword?.message ? true : false}
                helperText={
                  signupErrors.confirmPassword?.message ? (
                    <>{signupErrors.confirmPassword?.message}</>
                  ) : (
                    false
                  )
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
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
      </Box>
      <Box className="signup_user_input_box">
        <Box style={{ marginRight: "10px" }}>
          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="signup_user_input"
                label="Company Name"
                error={signupErrors.companyName?.message ? true : false}
                helperText={
                  signupErrors.companyName?.message ? (
                    <>{signupErrors.companyName?.message}</>
                  ) : (
                    false
                  )
                }
              />
            )}
          />
        </Box>
        <Box>
          <Controller
            name="companyTelNo"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="signup_user_input"
                label="Company Tel No"
                error={signupErrors.companyTelNo?.message ? true : false}
                helperText={
                  signupErrors.companyTelNo?.message ? (
                    <>{signupErrors.companyTelNo?.message}</>
                  ) : (
                    false
                  )
                }
              />
            )}
          />
        </Box>
      </Box>
      <Box className="signup_user_input_box">
        <Box style={{ marginRight: "10px" }}>
          <Controller
            name="companyEmail"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="signup_user_input"
                label="Company Email"
                error={signupErrors.companyEmail?.message ? true : false}
                helperText={
                  signupErrors.companyEmail?.message ? (
                    <>{signupErrors.companyEmail?.message}</>
                  ) : (
                    false
                  )
                }
              />
            )}
          />
        </Box>
        <Box>
          <Controller
            name="numberOfEmployees"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="signup_user_input"
                label="Number Of Employees"
                error={signupErrors.numberOfEmployees?.message ? true : false}
                helperText={
                  signupErrors.numberOfEmployees?.message ? (
                    <>{signupErrors.numberOfEmployees?.message}</>
                  ) : (
                    false
                  )
                }
              />
            )}
          />
        </Box>
      </Box>
      <Box className="signup_user_input_box">
        <Box style={{ marginRight: "10px" }}>
          <Controller
            name="companyAddress"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                style={{ width: "400px" }}
                className="signup_user_input"
                label="Company Address"
                multiline
                rows={3}
                error={signupErrors.companyAddress?.message ? true : false}
                helperText={
                  signupErrors.companyAddress?.message ? (
                    <>{signupErrors.companyAddress?.message}</>
                  ) : (
                    false
                  )
                }
              />
            )}
          />
        </Box>
      </Box>
      <Box className="signup_user_input_box">
        <Box
          style={{
            marginRight: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
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
                />
                <label htmlFor="avatar-input">
                  <Avatar
                    alt="User Avatar"
                    src={
                      getValues("companyLogoUrl") instanceof File
                        ? URL.createObjectURL(getValues("companyLogoUrl"))
                        : getValues("companyLogoUrl") || ""
                    }
                    style={{
                      width: 100,
                      height: 100,
                    }}
                  />
                  {fileError ? (
                    <div style={{ color: "#d32f2f", marginTop: "5px" }}>
                      File is required
                    </div>
                  ) : null}
                </label>
                <input
                  // {...field}
                  type="file"
                  accept="image/*"
                  id="avatar-input"
                  style={{
                    display: "flex",
                    alignSelf: "center",
                    marginLeft: "50px",
                  }}
                  onChange={(e: any) => handleFileChange(e)}
                />
              </>
            )}
          />
        </Box>
      </Box>
      <form onSubmit={handleSubmit(handleOk)}>
        <Box className="btn_sign_up">
          <Button
            variant="contained"
            color="warning"
            fullWidth
            type="submit"
            style={{ margin: "0px 10px" }}
            onClick={() => checkFile()}
          >
            SignUp
          </Button>
          <Button
            variant="contained"
            color="warning"
            fullWidth
            onClick={() => clearForm()}
          >
            Reset
          </Button>
        </Box>
      </form>
    </>
  );

  return (
    <div className="background">
      <CssBaseline />
      <Box className="signupBox">
        <Card elevation={9} className="cardstyle">
          <CardContent className="cardstyle">
            <Box style={{ textAlign: "center" }}>
              <img src={logo} alt="Logo" className="signup-logo" />
            </Box>
            <Box className="loginSecondaryTitleBox">
              <Typography
                className="signupTitle"
                style={{ fontWeight: "300", fontSize: "16px" }}
              >
                Sign Up
              </Typography>
            </Box>
            {isJobPoster == true || isJobSeeker == true ? (
              <Box>
                <Button variant="contained" onClick={() => backToOption()}>
                  Back
                </Button>
              </Box>
            ) : (
              <Box style={{ margin: "20px 0px" }}>
                <Button
                  variant="contained"
                  onClick={() => handleCheckJobSeeker()}
                  style={{ marginRight: "20px" }}
                >
                  Job Seeker
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleCheckIsJobPoster()}
                >
                  Job Poster
                </Button>
              </Box>
            )}

            {/* <Box className="signup_user_input_box">
              <Box style={{ marginRight: "10px" }}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="signup_user_input"
                      label="First Name"
                      name="firstName"
                      error={signupErrors.firstName?.message ? true : false}
                      helperText={
                        signupErrors.firstName?.message
                          ? signupErrors.firstName?.message
                          : false
                      }
                    />
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="signup_user_input"
                      label="Last Name"
                      name="lastName"
                      error={signupErrors.lastName?.message ? true : false}
                      helperText={
                        signupErrors.lastName?.message
                          ? signupErrors.lastName?.message
                          : false
                      }
                    />
                  )}
                />
              </Box>
            </Box>
            <Box className="signup_user_input_box">
              <Box style={{ marginRight: "10px" }}>
                <Controller
                  name="userName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="signup_user_input"
                      label="Username"
                      name="userName"
                      error={signupErrors.userName?.message ? true : false}
                      helperText={
                        signupErrors.userName?.message
                          ? signupErrors.userName?.message
                          : false
                      }
                    />
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="signup_user_input"
                      label="Email"
                      name="email"
                      error={signupErrors.email?.message ? true : false}
                      helperText={
                        signupErrors.email?.message
                          ? signupErrors.email?.message
                          : false
                      }
                    />
                  )}
                />
              </Box>
            </Box>
            <Box className="signup_user_input_box">
              <Box style={{ marginRight: "10px" }}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type={showPassword ? "text" : "password"}
                      className="signup_user_input"
                      label="Password"
                      name="password"
                      error={signupErrors.password?.message ? true : false}
                      helperText={
                        signupErrors.password?.message
                          ? signupErrors.password?.message
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
              <Box>
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      className="signup_user_input"
                      label="Confirm Password"
                      name="confirmPassword"
                      error={
                        signupErrors.confirmPassword?.message ? true : false
                      }
                      helperText={
                        signupErrors.confirmPassword?.message
                          ? signupErrors.confirmPassword?.message
                          : false
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownConfirmPassword}
                              edge="end"
                            >
                              {showConfirmPassword ? (
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
            </Box>
            <form onSubmit={handleSubmit(handleOk)}>
              <Box className="btn_sign_up">
                <Button
                  variant="contained"
                  color="warning"
                  fullWidth
                  type="submit"
                  style={{ margin: "0px 10px" }}
                >
                  SignUp
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  fullWidth
                  onClick={() => clearForm()}
                >
                  Reset
                </Button>
              </Box>
            </form> */}
            {isJobSeeker ? var1 : <></>}
            {isJobPoster ? var2 : <></>}
            <Typography className="loginTertiaryTitle">
              Already have account?
            </Typography>
            <Box className="btn-sub">
              <Button size="small" onClick={() => goToLogin()}>
                Log In
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default SignUp;
