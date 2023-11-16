import { Chip } from "@mui/material";
import { GridActionsCellItem, GridSortModel } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { format, parseISO } from "date-fns";
import {
  createState,
  deleteState,
  getAllState,
  updateState,
} from "../../../api/state";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function useStateSetupService() {
  const columns = React.useMemo(
    () => [
      {
        field: "name",
        headerName: "State Name",
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
          if (params.value === "0000-00-00 00:00:00") {
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
              removeState(params.row.id);
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
    } else {
      null;
    }
  }, [username]);

  const StateSchema = yup.object({
    name: yup.string().required().label("State"),
  });

  const {
    control,
    formState: { errors },
    getValues,
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
    resolver: yupResolver(StateSchema),
  });

  const [page, setPage] = useState(1);

  const [length, setLength] = useState(10);

  const [sort, setSort] = useState("");

  const [search, setSearch] = useState("");

  const [direction, setDirection] = useState("desc");

  const [isEdit, setIsEdit] = useState(false);

  const [stateData, setStateData] = useState([]);

  useEffect(() => {
    retrieveAllState();
  }, []);

  const retrieveAllState = async () => {
    const res = await getAllState();
    setStateData(res.data as any);
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
    console.log(formValues);
    try {
      if (!isEdit) {
        const res = await createState(formValues);
        if (res.data.resultCode == 1) {
          Swal.fire("Created Successfully", "", "success");
        } else {
          Swal.fire("Something is Wrong", "", "error");
        }
      } else {
        const res = await updateState(formValues);
        if (res.data.resultCode == 1) {
          Swal.fire("Updated Successfully", "", "success");
        } else {
          Swal.fire("Something is Wrong", "", "error");
        }
      }
      setIsModalVisible(false);
      retrieveAllState();
      reset();
    } catch (error: any) {
      console.log(error);
      setIsModalVisible(false);
    }
  };

  const removeState = async (id: any) => {
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
        const res = await deleteState({ id: id });
        if (res.data.Status == "Success") {
          Swal.fire("Deleted Successfully", "", "success");
        } else {
          Swal.fire("Something is wrong", "", "error");
        }
        retrieveAllState();
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
    stateData,
    errors,
  };
}
