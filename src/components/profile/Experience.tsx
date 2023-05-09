
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useForm, Resolver, Controller } from "react-hook-form";
import { ProfileModel } from "./ProfileModel";

export const Experience = () => {
  const { handleSubmit, control } = useForm<ProfileModel>();
  return (
    <>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Controller
          name={"experience.0.title"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              margin="normal"
              id="experience.0.title"
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
          name={"experience.0.company"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              margin="normal"
              id="experience.0.company"
              fullWidth
              multiline
              onChange={onChange}
              value={value}
              label="Company"
              autoComplete="Company"
              autoFocus
            />
          )}
        />
        <Controller
          name={"experience.0.location"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              margin="normal"
              id="experience.0.location"
              fullWidth
              onChange={onChange}
              value={value}
              label="Location"
              autoComplete="Location"
              autoFocus
            />
          )}
        />
        <Controller
          name={"experience.0.from"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              margin="normal"
              id="experience.0.from"
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
          name={"experience.0.to"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              margin="normal"
              id="experience.0.to"
              type="date"
              onChange={onChange}
              value={value}
              autoComplete="To"
              autoFocus
            />
          )}
        />
        <Controller
          name={"experience.0.current"}
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
          <TableCell>Company</TableCell>
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

