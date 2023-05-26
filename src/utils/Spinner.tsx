import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Stack } from "@mui/material";
function Spinner() {
  return (
    <Stack alignItems="center" className="mt-24">
      <CircularProgress />
    </Stack>
  );
}

export default Spinner;
