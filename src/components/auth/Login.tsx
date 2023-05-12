import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { Button, Avatar, TextField, Box, Typography } from "@mui/material";
import { useForm, Resolver, Controller } from "react-hook-form";
import LockOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { useLoginUserMutation } from "../../app/services/api";
import type { LoginRequest } from "../../app/services/api";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resolver: Resolver<LoginRequest> = async (values) => {
    return {
      values: !values.email ? {} : values,
      errors: !values.email
        ? {
            email: {
              type: "required",
              message: "This is required.",
            },
          }
        : {},
    };
  };
  const [login, { isSuccess }] = useLoginUserMutation();
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: resolver,
  });
  const onSubmit = handleSubmit(async () => {
    try {
      const user = await login(getValues()).unwrap();
      dispatch(setCredentials(user));
      navigate("/home/posts");
    } catch (err) {
      console.error(err);
    }
  });
  return (
    <Box>
      <div className="px-4 py-32 sm:px-6 lg:px-8 max-w-lg mx-auto  bg-white rounded-xl shadow-lg hover:shadow-2xl items-center">
        <div className="relative">
          <Avatar className="mx-auto h-12 w-auto ">
            <LockOutlinedIcon />
          </Avatar>

          <p className="mt-2 mvtext-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              create your account
            </Link>
          </p>
        </div>
        <form onSubmit={onSubmit}>
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
                margin="normal"
                id="password"
                type="password"
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

export default Login;
