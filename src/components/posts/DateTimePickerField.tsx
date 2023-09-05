import * as React from "react";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { filterByDate } from "./postsSlice";
import { useAppDispatch } from "../../app/services/hooks";

export default function DateTimePickerField() {
  const dispatch = useAppDispatch();
  const [fromvalue, setFrommValue] = React.useState<Dayjs | null>(null);
  const [tovalue, setToValue] = React.useState<Dayjs | null>(null);

  React.useEffect(() => {
    if (fromvalue != null && tovalue != null) {
      // dispatch(
      //   filterByDate({
      //     from: fromvalue,
      //     to: tovalue,
      //   })
      // );
    }
  }, [tovalue, fromvalue, dispatch]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="content-end space-x-2 ">
        <DatePicker
          label="From"
          slotProps={{ textField: { size: "small" } }}
          value={fromvalue}
          onChange={(newValue) => setFrommValue(newValue)}
        />
        <DatePicker
          label="To"
          slotProps={{ textField: { size: "small" } }}
          value={tovalue}
          onChange={(newValue) => setToValue(newValue)}
        />
      </div>
    </LocalizationProvider>
  );
}
