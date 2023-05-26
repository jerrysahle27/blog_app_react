import React from "react";
import { SendAndArchive } from "@mui/icons-material";
import { TextField, IconButton } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { comment } from "./PostsList";
import { Comment, commentPost } from "./postsSlice";
import { useAppDispatch } from "../../app/services/hooks";
import AlertNotification from "../../utils/AlertNotification";
interface Props {
  id: string;
  index: number;
  showComment: comment[];
}
export default function PostsComment(props: Props) {
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const dispatch = useAppDispatch();
  const CommentSchema = yup.object().shape({
    text: yup.string().required(),
  });

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<Comment>({
    resolver: yupResolver(CommentSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    dispatch(commentPost(data))
      .unwrap()
      .then((payload) => {
        setOpenSuccess(true);
        setMessage("Comment Saved Successfully");
      })
      .catch((error) => setOpenError(true));
  });
  return (
    <>
      {props.showComment[props.index]?.status ? (
        <form onSubmit={onSubmit}>
          <div className="flex justify-between ml-2">
            <input {...register("id")} type="hidden" value={props.id} />
            <Controller
              name={"text"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  helperText={errors?.text ? errors.text.message : ""}
                  error={errors?.text ? true : false}
                  margin="normal"
                  multiline
                  size="small"
                  id="text"
                  fullWidth
                  onChange={onChange}
                  value={value}
                  label="Text"
                  autoComplete="text"
                  autoFocus
                />
              )}
            />
            <IconButton type="submit" size="small">
              <SendAndArchive />
              <p className="line-clamp-3 text-sm leading-6 ml-1 text-gray-900">
                Send
              </p>
            </IconButton>
          </div>
        </form>
      ) : null}
      <AlertNotification
        openSuccess={openSuccess}
        openError={openError}
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        message={message}
      />
    </>
  );
}
