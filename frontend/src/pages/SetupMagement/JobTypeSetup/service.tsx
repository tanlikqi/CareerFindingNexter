import { Chip } from "@mui/material";
import { GridActionsCellItem, GridSortModel } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  createJobType,
  deleteJobType,
  getAllJobType,
  updateJobType,
} from "../../../api/jobType";
import Swal from "sweetalert2";
import { format, parseISO } from "date-fns";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function useJobTypeSetupService() {
  const columns = React.useMemo(
    () => [
      {
        field: "name",
        headerName: "Job Type Name",
        flex: 1,
        minWidth: 100,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
        midWidth: 130,
        headerClassName: "super-app-theme--header",
        renderCell: (cellValues: any) => {
          return (
            <div>
              <Chip
                label={cellValues.value}
                color={cellValues.value === "ACTIVE" ? "success" : "error"}
              ></Chip>
            </div>
          );
        },
      },
      {
        field: "createdDt",
        headerName: "Create Date",
        flex: 1,
        midWidth: 130,
        headerClassName: "super-app-theme--header",
        valueFormatter: (params: any) => {
          // Parse the date and format it using a library like date-fns or moment.js
          const formattedDate = format(
            parseISO(params.value),
            "yyyy/MM/dd HH:mm:ss"
          );
          return formattedDate;
        },
      },
      {
        field: "createdBy",
        headerName: "Create By",
        flex: 1,
        midWidth: 130,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "updatedDt",
        headerName: "Update Date",
        flex: 1,
        midWidth: 165,
        headerClassName: "super-app-theme--header",
        valueFormatter: (params: any) => {
          // Check if the date is "0000-00-00 00:00:00.000000"
          if (params.value === "0000-00-00 00:00:00.000000") {
            return ""; // Or any other default value you prefer
          }

          // Parse the date and format it using date-fns
          const formattedDate = format(
            parseISO(params.value),
            "yyyy/MM/dd HH:mm:ss"
          );
          return formattedDate;
        },
      },
      {
        field: "updatedBy",
        headerName: "Update By",
        flex: 1,
        midWidth: 130,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "action",
        headerName: "Action",
        type: "actions",
        flex: 1,
        midWidth: 130,
        headerClassName: "super-app-theme--header",
        getActions: (params: any) => [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => {
              handleOpenModal(params.row, "edit");
            }}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {
              removeJobType(params.row.id);
            }}
          />,
        ],
      },
    ],
    []
  );

  const username = localStorage.getItem("userName");

  useEffect(() => {
    if (username !== null) {
      setValue("createdBy", username);
      console.log("gor username");
    } else {
      null;
      console.log("no username");
    }
  }, [username]);

  const JobTypeSchema = yup.object({
    // companyLogoUrl: yup
    //   .mixed()
    //   .test("fileSize", "File size is too large", (value: any) => {
    //     return value && value[0] ? value[0].size <= 1024000 : true;
    //   })
    //   .test("fileType", "Invalid file type", (value: any) => {
    //     return value && value[0]
    //       ? ["image/jpeg", "image/png"].includes(value[0].type)
    //       : true;
    //   })
    //   .required("File is required"),
    name: yup.string().required().label("Job Type"),
  });

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
  } = useForm<any>({
    defaultValues: {
      id: "",
      name: "",
      status: "ACTIVE",
      createdBy: username,
      updatedBy: "",
    },
    resolver: yupResolver(JobTypeSchema),
  });

  const [page, setPage] = useState(1);

  const [length, setLength] = useState(10);

  const [sort, setSort] = useState("");

  const [search, setSearch] = useState("");

  const [direction, setDirection] = useState("desc");

  const [isEdit, setIsEdit] = useState(false);

  const [jobTypeData, setJobTypeData] = useState([]);

  useEffect(() => {
    retrieveAllJobType();
  }, []);

  const retrieveAllJobType = async () => {
    const res = await getAllJobType();
    setJobTypeData(res.data as any);
  };

  const handleSort = async (sortModel: GridSortModel) => {
    if (sortModel && sortModel.length > 0) {
      setSort(sortModel[0].field);
      setDirection(sortModel[0].sort ? sortModel[0].sort : "asc");
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = (data?: any, modalmode?: any) => {
    setIsModalVisible(true);
    if (modalmode == "edit") {
      setIsEdit(true);
      console.log(data);
      setValue("id", data.id);
      setValue("name", data.name);
      setValue("status", data.status);
      if (username !== null) {
        setValue("updatedBy", username);
      }
    } else {
      setIsEdit(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    reset();
  };

  const handleOk: SubmitHandler<any> = async (formValues: any) => {
    try {
      if (!isEdit) {
        const res = await createJobType(formValues);
        if (res.data.resultCode == 1) {
          Swal.fire("Created Successfully", "", "success");
        } else {
          Swal.fire("Something is Wrong", "", "error");
        }
      } else {
        const res = await updateJobType(formValues);
        if (res.data.resultCode == 1) {
          Swal.fire("Updated Successfully", "", "success");
        } else {
          Swal.fire("Something is Wrong", "", "error");
        }
      }
      setIsModalVisible(false);
      retrieveAllJobType();
      reset();
    } catch (error: any) {
      console.log(error);
      setIsModalVisible(false);
    }
  };

  const removeJobType = async (id: any) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure want to delete?",
      text: "You can't revert this once it is done",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteJobType({ id: id });
        if (res.data.Status == "Success") {
          Swal.fire("Deleted Successfully", "", "success");
        } else {
          Swal.fire("Something is wrong", "", "error");
        }
        retrieveAllJobType();
      } else {
        null;
      }
    });
  };

  return {
    columns,
    handleSort,
    setLength,
    length,
    setPage,
    page,
    handleOpenModal,
    isModalVisible,
    handleCloseModal,
    isEdit,
    control,
    handleOk,
    handleSubmit,
    jobTypeData,
    errors,
  };
}