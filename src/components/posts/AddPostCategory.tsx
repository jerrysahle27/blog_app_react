import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { useForm, Resolver, Controller } from "react-hook-form";
import { PostCategoryRequest } from "./postsSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
export interface DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickOpen: () => void;
}
function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function AddPostCategory(props: DialogProps) {
  const { handleSubmit, control, getValues } = useForm<PostCategoryRequest>();
  // const [AddPostCategory, { isLoading }] = useAddPostCategoryMutation();
  const handleClose = () => {
    props.setOpen(false);
  };
  const onSubmit = handleSubmit(async () => {
    try {
      console.log(getValues());
      // const category = await AddPostCategory(getValues()).unwrap();
    } catch (err) {
      console.error(err);
    }
  });
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Create Post Category
        </BootstrapDialogTitle>
        <form onSubmit={onSubmit}>
          <DialogContent dividers>
            <Controller
              name={"title"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  margin="normal"
                  id="title"
                  required
                  fullWidth
                  onChange={onChange}
                  value={value}
                  label="Name"
                  autoComplete="title"
                  autoFocus
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  );
}
