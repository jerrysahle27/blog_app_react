import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  title: string,
  school: string,
  degree: string,
  fieldofstudy: string,
  location: string,
  from: string,
  to: string,
  current: boolean
) {
  return { title, school, degree, fieldofstudy, location, from, to, current };
}

const rows = [createData("Mr", "stc", "", "", "", "", "", false)];

export default function Education() {
  return (
    <React.Fragment>
      <TableContainer component={Paper} sx={{ m: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">School</TableCell>
              <TableCell align="right">Degree</TableCell>
              <TableCell align="right">Field Of Study</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">From</TableCell>
              <TableCell align="right">To</TableCell>
              <TableCell align="right">Current</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.school}</TableCell>
                <TableCell align="right">{row.degree}</TableCell>
                <TableCell align="right">{row.fieldofstudy}</TableCell>
                <TableCell align="right">{row.location}</TableCell>
                <TableCell align="right">{row.from}</TableCell>
                <TableCell align="right">{row.to}</TableCell>
                <TableCell align="right">{row.current}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <button
        // onClick={handleNext}
        className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 mt-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Add Education History
      </button>
    </React.Fragment>
  );
}
