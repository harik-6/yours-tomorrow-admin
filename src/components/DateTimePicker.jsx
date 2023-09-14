import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function DateAndTimePicker({ label, onChange, value }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={label}
        onChange={onChange}
        ampm
        format="DD/MM/YYYY hh:mm A"
        defaultValue={dayjs()}
        value={dayjs(value)}
      />
    </LocalizationProvider>
  );
}
