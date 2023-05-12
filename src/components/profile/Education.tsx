import * as React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TextField,
  TableContainer,
  TableRow,
  tableCellClasses,
  FormControlLabel,
  Paper,
  Checkbox,
} from "@mui/material";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import {
  addNewEducation,
  selectProfile,
  deleteEducation,
} from "./profileSlice";
import { CheckSharp, DeleteSharp } from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "../../app/services/hooks";
import { ProfileModel } from "./ProfileModel";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Education() {
  const profile = useAppSelector(selectProfile);
  const [showForm, setShowForm] = React.useState(true);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<ProfileModel>();
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      fontWeight: 2,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.common.white,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 2,
    },
  }));
  const onSubmit = handleSubmit((data) => {
    dispatch(addNewEducation(data))
      .unwrap()
      .then((payload) => setOpenSuccess(true))
      .catch((error) => setOpenError(true));
  });
  const handleShowForm = () => {
    showForm === false ? setShowForm(true) : setShowForm(false);
  };
  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    openSuccess === true ? setOpenSuccess(false) : setOpenError(false);
  };

  const handleDelete = (_id: string) => {
    dispatch(deleteEducation(_id))
      .unwrap()
      .then((payload) => setOpenSuccess(true))
      .catch((error) => setOpenError(true));
  };

  return (
    <React.Fragment>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table
          className=" "
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">School</StyledTableCell>
              <StyledTableCell align="center">Degree</StyledTableCell>
              <StyledTableCell align="center">Field of study</StyledTableCell>
              <StyledTableCell align="center">From</StyledTableCell>
              <StyledTableCell align="center">To</StyledTableCell>
              <StyledTableCell align="center">Current</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profile.Education.map((row) => (
              <StyledTableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell align="center">{row.school}</StyledTableCell>
                <StyledTableCell align="center">{row.degree}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.fieldofstudy}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {dayjs(row.from).format("DD/MM/YYYY")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {dayjs(row.to).format("DD/MM/YYYY")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.current ? <CheckSharp /> : <CheckSharp />}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {" "}
                  <DeleteSharp onClick={() => handleDelete(row._id)} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {showForm ? (
        <>
          <button
            onClick={handleShowForm}
            className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 mt-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Hide Form
          </button>

          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Controller
                name={"Education.0.school"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    margin="normal"
                    id="Education.0.school"
                    fullWidth
                    multiline
                    onChange={onChange}
                    value={value}
                    label="School"
                    autoComplete="School"
                    autoFocus
                  />
                )}
              />
              <Controller
                name={"Education.0.degree"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    margin="normal"
                    id="Education.0.degree"
                    fullWidth
                    onChange={onChange}
                    value={value}
                    label="Degree"
                    autoComplete="Degree"
                    autoFocus
                  />
                )}
              />
              <Controller
                name={"Education.0.fieldofstudy"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    margin="normal"
                    id="Education.0.fieldofstudy"
                    fullWidth
                    onChange={onChange}
                    value={value}
                    label="Field of Study"
                    autoComplete="Field of Study"
                    autoFocus
                  />
                )}
              />

              <Controller
                name={"Education.0.from"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    margin="normal"
                    id="Education.0.from"
                    fullWidth
                    type="date"
                    onChange={onChange}
                    value={value}
                    autoComplete="From"
                    autoFocus
                  />
                )}
              />
              <Controller
                name={"Education.0.to"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    margin="normal"
                    id="Education.0.to"
                    type="date"
                    onChange={onChange}
                    value={value}
                    autoComplete="To"
                    autoFocus
                  />
                )}
              />
              <Controller
                name={"Education.0.current"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        onChange={onChange}
                        value={value}
                      />
                    }
                    label="Current"
                  />
                )}
              />
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        </>
      ) : (
        <button
          onClick={handleShowForm}
          className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 mt-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Education
        </button>
      )}
      <Snackbar
        open={openSuccess}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Request Done Successfully !
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Something went wrong !
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
