import * as React from "react";
import { TextField, Autocomplete } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogProps } from "./AddPostCategory";
import { Controller, Resolver, useForm } from "react-hook-form";
import { Post, addNewPost } from "./postsSlice";
import { useGetPostCategorysQuery } from "../../app/services/api";
import { useAppDispatch } from "../../app/services/hooks";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddPost(props: DialogProps) {
  const { data: postCategoryList = [] } = useGetPostCategorysQuery();
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const dispatch = useAppDispatch();
  const resolver: Resolver<Post> = async (values) => {
    return {
      values: !values.title ? {} : values,
      errors: !values.title
        ? {
            title: {
              type: "required",
              message: "This is required.",
            },
          }
        : !values.description
        ? {
            description: {
              type: "required",
              message: "This is required.",
            },
          }
        : !values.category
        ? {
            category: {
              type: "required",
              message: "This is required.",
            },
          }
        : {},
    };
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Post>({
    resolver: resolver,
  });
  const handleClose = () => {
    props.setOpen(false);
  };
  const onSumbit = handleSubmit((data) => {
    dispatch(addNewPost(data))
      .unwrap()
      .then((payload) => setOpenSuccess(true))
      .catch((error) => setOpenError(true));
    props.setOpen(false);
  });

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    openSuccess === true ? setOpenSuccess(false) : setOpenError(false);
  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <form onSubmit={onSumbit}>
          <DialogTitle>New Post</DialogTitle>
          <DialogContent>
            <Controller
              name={"title"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  helperText={errors?.title ? errors.title.message : ""}
                  error={errors?.title ? true : false}
                  margin="normal"
                  id="title"
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
              name={"description"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  helperText={
                    errors?.description ? errors.description.message : ""
                  }
                  error={errors?.description ? true : false}
                  multiline
                  margin="normal"
                  id="description"
                  fullWidth
                  onChange={onChange}
                  value={value}
                  label="Description"
                  autoComplete="description"
                  autoFocus
                />
              )}
            />
            <Controller
              name="category"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  disablePortal
                  className="mt-8 mb-16"
                  options={postCategoryList}
                  getOptionLabel={(option) => option.title || ""}
                  value={value}
                  onChange={(event, newValue) => {
                    onChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Category"
                      label="Category"
                      error={!!errors.category}
                      helperText={errors?.category?.message}
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <button
              className=" bg-blue-500 px-3 py-2 text-sm font-semibold mr-1 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              type="submit"
            >
              {" "}
              Save
            </button>
            <button
              className=" bg-blue-500 px-3 py-2 text-sm font-semibold mr-1 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              type="submit"
              onClick={handleClose}
            >
              {" "}
              Cancel
            </button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Post Created Successfully !
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
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
    </div>
  );
}
