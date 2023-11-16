import React from "react";
import "./profile.scss";
import { Avatar, Box, Button, TextField } from "@mui/material";

function Profile() {
  return (
    <div className="profile-container">
      <div className="bg" />
      <div className="avatar">
        <label htmlFor="upload">
          <Avatar className="avatar-img" />
        </label>
        <input
          type="file"
          style={{ display: "none" }}
          hidden={true}
          id="upload"
        />
      </div>
      <div className="details">
        <p>
          <b>UserName :</b>Admin 123
        </p>
        <p>
          <b>Role :</b>Admin
        </p>
        <p>
          <b>Email :</b>Admin@gmail.com
        </p>
      </div>
      <div className="input-container">
        <Box>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <TextField label="Input 1" style={{ marginBottom: "20px" }} />
            <TextField label="Input 2" style={{ marginBottom: "40px" }} />
          </Box>
          <Box>
            <Button variant="contained" style={{ marginRight: "10px" }}>
              Save
            </Button>
            <Button variant="contained">Cancel</Button>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default Profile;
