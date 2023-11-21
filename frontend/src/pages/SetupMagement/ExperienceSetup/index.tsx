import React, { ReactNode } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import useExperienceSetupSerivce from "./service";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";

function ExperienceSetup() {
  const {
    columns,
    handleSort,
    length,
    setLength,
    setPage,
    page,
    handleCloseModal,
    handleOpenModal,
    isModalVisible,
    isEdit,
    control,
    handleOk,
    handleSubmit,
    experienceData,
    errors,
  } = useExperienceSetupSerivce();
  return (
    <div>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <TextField
          // onChange={(e: any) => handleSearchInput(e)}
          label="Search  "
          color="warning"
        />
        <Button
          variant="contained"
          onClick={() => {
            handleOpenModal();
          }}
        >
          Create
        </Button>
      </Box>
      <div style={{ marginBottom: "200px" }}>
        <Box
          sx={{
            height: 300,
            width: "100%",
            "& .super-app-theme--header": {
              backgroundColor: "orange",
              color: "white",
            },
          }}
        >
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={experienceData}
              columns={columns}
              pagination
              disableRowSelectionOnClick
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[10, 25, 50, 100]}
              paginationMode="client"
              // rowCount={jobTypeData.length}
              autoHeight={true}
              sortingMode="client"
              onSortModelChange={handleSort}
              // getRowId={(row) => row.id}
              // loading={loading ? true : false}
              density="comfortable"
            />
          </div>
        </Box>
      </div>
      <Dialog open={isModalVisible} onClose={handleCloseModal}>
        <DialogTitle>
          {isEdit ? "Edit Experience" : "Create Experience"}
        </DialogTitle>
        <DialogContent>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "20px",
            }}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Experience"
                  error={errors.name?.message ? true : false}
                  helperText={
                    errors.name?.message
                      ? (errors.name?.message as ReactNode)
                      : null
                  }
                />
              )}
            />

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  {...field}
                  control={<Switch />}
                  label="Status"
                  checked={field.value === "ACTIVE" ? true : false}
                  onChange={(event) =>
                    field.onChange(
                      event.target.checked === true ? "ACTIVE" : "INACTIVE"
                    )
                  }
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <form onSubmit={handleSubmit(handleOk)}>
            <Button type="submit">Save</Button>
            <Button
              onClick={() => {
                handleCloseModal();
              }}
            >
              Cancel
            </Button>
          </form>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ExperienceSetup;
