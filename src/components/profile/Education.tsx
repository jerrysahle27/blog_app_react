import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TextField,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { useForm, Resolver, Controller } from "react-hook-form";
import { ProfileModel } from "./ProfileModel";

export const Education = () => {
  const { control } = useForm<ProfileModel>();
  return (
    <>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Controller
          name={"education.0.title"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              margin="normal"
              id="education.0.title"
              fullWidth
              onChange={onChange}
              value={value}
              label="Title"
              autoComplete="title"
              autoFocus
            />
          )}
        />
        <Controller
          name={"education.0.school"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              margin="normal"
              id="education.0.school"
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
          name={"education.0.degree"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              margin="normal"
              id="education.0.degree"
              fullWidth
              multiline
              onChange={onChange}
              value={value}
              label="Degree"
              autoComplete="Degree"
              autoFocus
            />
          )}
        />
        <Controller
          name={"education.0.from"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              margin="normal"
              id="education.0.from"
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
          name={"education.0.to"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              margin="normal"
              id="education.0.to"
              fullWidth
              type="date"
              onChange={onChange}
              value={value}
              autoComplete="To"
              autoFocus
            />
          )}
        />
        <Controller
          name={"education.0.current"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormControlLabel
              control={
                <Checkbox defaultChecked onChange={onChange} value={value} />
              }
              label="Current"
            />
          )}
        />
      </div>
      <Table className="mt-2">
        <TableHead>
          <TableCell>Title</TableCell>
          <TableCell>School</TableCell>
          <TableCell>Degree</TableCell>
          <TableCell>Field Of Study</TableCell>
          <TableCell>Location</TableCell>
          <TableCell>From</TableCell>
          <TableCell>To</TableCell>
          <TableCell>Current</TableCell>
        </TableHead>
        <TableBody></TableBody>
      </Table>
      ;
    </>
  );
};
