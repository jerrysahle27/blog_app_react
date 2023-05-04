import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Avatar, TextField, Box } from "@mui/material";
import { useForm, Resolver, Controller } from "react-hook-form";
import { ProfileModel } from "./ProfileModel";
export const Profile = () => {
  const dispatch = useDispatch();

  const resolver: Resolver<ProfileModel> = async (values) => {
    return {
      values: !values.company ? {} : values,
      errors: !values.company
        ? {
            company: {
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
    <div className="px-4 py-20 sm:px-6 lg:px-8  items-center">
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-4 gap-4">
          <Controller
            name={"company"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                margin="normal"
                id="company"
                required
                fullWidth
                onChange={onChange}
                value={value}
                label="Company"
                autoComplete="Commpany"
                autoFocus
              />
            )}
          />
        </div>

        <Button
          type="submit"
          // fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Profile;
