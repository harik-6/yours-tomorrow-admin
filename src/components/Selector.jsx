import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Selector({ selected, onChange, values = [], label }) {
  return (
    <FormControl fullWidth>
      <InputLabel id={`selector-id-${label}`}>{label}</InputLabel>
      <Select
        labelId="selector-label-id"
        id={`selector-id-${label}`}
        value={selected}
        label={label}
        onChange={onChange}
      >
        {values.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
