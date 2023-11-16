import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";

interface IProps {
  label: any;
  defaultOption?: any;
  value?: any;
  onChange?: any;
  listItem?: any;
  error?: boolean;
  helperText?: any;
  style?: any;
}

function CustomSelect({
  label,
  defaultOption,
  value,
  onChange,
  listItem,
  error,
  helperText,
}: IProps) {
  console.log(listItem);
  return (
    <>
      <FormControl variant="filled" sx={{ minWidth: 120 }}>
        <InputLabel
          htmlFor="outlined-select-label"
          shrink={true}
          error={error ? true : false}
        >
          {label}
        </InputLabel>
        <Select
          value={value}
          onChange={onChange}
          displayEmpty
          fullWidth
          style={{ width: "220px" }}
          error={error ? true : false}
          id="outlined-select-label"
          label={label}
        >
          <MenuItem value="">{defaultOption}</MenuItem>
          {listItem.length > 0 ? (
            listItem.map((value: any, index: number) => {
              return (
                <MenuItem value={value.name} key={index}>
                  {value.name}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem value="12">popo</MenuItem>
          )}
          {/* {} */}
        </Select>
        <div
          style={{
            color: "#d32f2f",
            fontSize: "0.75rem",
            textAlign: "left",
            letterSpacing: "0.03333em",
            margin: "3px 14px 0px 14px",
            lineHeight: "1.66",
            fontWeight: 400,
          }}
        >
          {helperText}
        </div>
      </FormControl>
    </>
  );
}

export default CustomSelect;
