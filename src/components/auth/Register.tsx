import { Avatar, Box, Button, TextField } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { AccountCircleRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation, UserRequest } from "../../app/services/api";

const Register = () => {
  const navigate = useNavigate();
  const [register, { isSuccess }] = useRegisterUserMutation();
  const { handleSubmit, control, getValues } = useForm<UserRequest>();
  const onSubmit = handleSubmit(async () => {
    try {
      await register(getValues()).unwrap();
      if (isSuccess === true) {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  });
  return (
    <Box>
      <div className="px-4 py-32 sm:px-6 lg:px-8 max-w-lg mx-auto  bg-white rounded-xl shadow-lg hover:shadow-2xl items-center">
        <div className="relative">
          <Avatar className="mx-auto h-12 w-auto ">
            <AccountCircleRounded />
          </Avatar>
          <h2 className="mt-6 text-center text-sm font-bold tracking-tight text-blue-500">
            Create account
          </h2>
        </div>
        <form onSubmit={onSubmit}>
          <Controller
            name={"name"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                margin="normal"
                id="name"
                required
                fullWidth
                onChange={onChange}
                value={value}
                label="Name"
                autoComplete="name"
                autoFocus
              />
            )}
          />
          <Controller
            name={"email"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                margin="normal"
                id="email"
                required
                fullWidth
                onChange={onChange}
                value={value}
                label="Email Address"
                autoComplete="email"
                autoFocus
              />
            )}
          />
          <Controller
            name={"password"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                type="password"
                margin="normal"
                id="password"
                required
                fullWidth
                onChange={onChange}
                value={value}
                label="Password"
                autoComplete="password"
                autoFocus
              />
            )}
          />
          <Controller
            name={"password2"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                type="password"
                margin="normal"
                id="password2"
                required
                fullWidth
                onChange={onChange}
                value={value}
                label="Confirm Password"
                autoComplete="password2"
                autoFocus
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Box>
  );
};

export default Register;
