import * as React from "react";
import { TextField, Autocomplete } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Controller, useForm } from "react-hook-form";
import { Post, addNewPost } from "./postsSlice";
import { useGetPostCategorysQuery } from "../../app/services/api";
import { useAppDispatch } from "../../app/services/hooks";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AlertNotification from "../../utils/AlertNotification";
export interface DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickOpen: () => void;
}
export default function AddPost(props: DialogProps) {
  const { data: postCategoryList = [] } = useGetPostCategorysQuery();
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const dispatch = useAppDispatch();
  const PostSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    category: yup.object().required(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Post>({
    resolver: yupResolver(PostSchema),
  });
  const handleClose = () => {
    props.setOpen(false);
  };
  const onSumbit = handleSubmit((data) => {
    dispatch(addNewPost(data))
      .unwrap()
      .then((payload) => {
        setOpenSuccess(true);
        setMessage("Post Created Successfully");
      })
      .catch((error) => setOpenError(true));
    props.setOpen(false);
  });
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
      <AlertNotification
        openSuccess={openSuccess}
        openError={openError}
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        message={message}
      />
    </div>
  );
}
