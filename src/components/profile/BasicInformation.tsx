import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Avatar, TextField, Box } from "@mui/material";
import { useForm, Resolver, Controller } from "react-hook-form";
import { ProfileModel } from "./ProfileModel";
export const BasicInformation = () => {
  const dispatch = useDispatch();

  const resolver: Resolver<ProfileModel> = async (values) => {
    return {
      values: !values.skill ? {} : values,
      errors: !values.skill
        ? {
            skill: {
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
    getValues,
    formState: { errors },
  } = useForm<ProfileModel>({
    resolver: resolver,
  });
  const onSubmit = handleSubmit(async () => {
    try {
    } catch (err) {
      console.error(err);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="relative mt-8 flex items-center gap-x-4">
        <img
          // src={post.user.avatar}
          alt=""
          className="h-10 w-10 rounded-full bg-gray-50"
        />
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <a href="/">
              <span className="absolute inset-0" />
              John Doe
              {/* {post.user.name} */}
            </a>
          </p>
          <p className="text-gray-600">
            {/* {post.user.email} */}
            JhonD@gmail.com
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name={"skill"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              margin="normal"
              id="skill"
              required
              fullWidth
              onChange={onChange}
              value={value}
              label="skill"
              autoComplete="skill"
              autoFocus
            />
          )}
        />
        <Controller
          name={"bio"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              margin="normal"
              id="bio"
              fullWidth
              multiline
              onChange={onChange}
              value={value}
              label="bio"
              autoComplete="bio"
              autoFocus
            />
          )}
        />
        <Controller
          name={"githubusername"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              margin="normal"
              id="githubusername"
              fullWidth
              onChange={onChange}
              value={value}
              label="Github Link"
              autoComplete="Github Link"
              autoFocus
            />
          )}
        />

        <Controller
          name={"Socialmedia.Facebook"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              margin="normal"
              id="Socialmedia.Facebook"
              fullWidth
              onChange={onChange}
              value={value}
              label="Facebook Link"
              autoComplete="Facebook Link"
              autoFocus
            />
          )}
        />
        <Controller
          name={"Socialmedia.LinkedIn"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              margin="normal"
              id="Socialmedia.LinkedIn"
              fullWidth
              onChange={onChange}
              value={value}
              label="LinkedIn Link"
              autoComplete="LinkedIn Link"
              autoFocus
            />
          )}
        />
        <Controller
          name={"Socialmedia.Twitter"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              margin="normal"
              id="Socialmedia.Twitter"
              fullWidth
              onChange={onChange}
              value={value}
              label="Twitter Link"
              autoComplete="Twitter Link"
              autoFocus
            />
          )}
        />
        <Controller
          name={"Socialmedia.Instagram"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              margin="normal"
              id="Socialmedia.Instagram"
              fullWidth
              onChange={onChange}
              value={value}
              label="Instagram Link"
              autoComplete="Instagram Link"
              autoFocus
            />
          )}
        />
        <Controller
          name={"Socialmedia.Youtube"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              margin="normal"
              id="Socialmedia.Youtube"
              fullWidth
              onChange={onChange}
              value={value}
              label="Youtube Link"
              autoComplete="Youtube Link"
              autoFocus
            />
          )}
        />
      </div>
    </form>
  );
};


