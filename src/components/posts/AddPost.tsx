import * as React from "react";
import Button from "@mui/material/Button";
import { TextField, Autocomplete } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogProps } from "./AddPostCategory";
import { Controller, Resolver, useForm } from "react-hook-form";
import { Post, addNewPost } from "./postsSlice";
import { useGetPostCategorysQuery } from "../../app/services/api";
import { useAppDispatch, useAppSelector } from "../../app/services/hooks";

export default function AddPost(props: DialogProps) {
  const { data: postCategoryList = [] } = useGetPostCategorysQuery();
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
  const onSumbit = handleSubmit((data) => dispatch(addNewPost(data)));
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
            <Button type="submit" variant="contained">
              Save
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
