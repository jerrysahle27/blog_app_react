import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import {
  Button,
  Input,
  Card,
  CardActions,
  CardContent,
  Avatar,
  TextField,
  Box,
} from "@mui/material";
import { useForm, Resolver } from "react-hook-form";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ProtectedComponent } from "../ProtectedComponent";
import { useLoginUserMutation } from "../../app/services/auth/auth";
import type { LoginRequest } from "../../app/services/auth/auth";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formState, setFormState] = React.useState<LoginRequest>({
    email: "",
    password: "",
  });
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
  const [login, { isLoading }] = useLoginUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: resolver,
  });
  const onSubmit = handleSubmit(async () => {
    try {
      const user = await login(formState).unwrap();
      dispatch(setCredentials(user));
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  });
  return (
    <Box>
      <div>
        <Avatar className="mx-auto h-12 w-auto">
          <LockOutlinedIcon />
        </Avatar>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-500">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            create your account
          </a>
        </p>
      </div>
      <div className="px-4 py-12 sm:px-6 lg:px-8 max-w-lg mx-auto  bg-white rounded-xl shadow-lg flex items-center space-x-4">
        <form onSubmit={onSubmit}>
          {/* <label className="block">
            <span> Email</span>
            <Input {...register("email")} placeholder="Email" />
            {errors?.email && <p>{errors.email.message}</p>}
          </label> */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            // name="email"
            autoComplete="email"
            autoFocus
            {...register("email")}
          />
          {errors?.email && <p>{errors.email.message}</p>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            // name="email"
            autoComplete="password"
            autoFocus
            {...register("password")}
          />
          {errors?.password && <p>{errors.password.message}</p>}
          {/* <div>
            <label>Password</label>
            <Input {...register("password")} placeholder="Password" />
          </div> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            // className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          >
            Sign In
          </Button>
          {/* <button
            type="submit"
            className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          >
            Submit
          </button> */}
        </form>
      </div>
      {/* <div className="container mx-auto bg-indigo-300">
        <div className="object-cover h-100 w-96 ">
          <Card variant="outlined">
            <form onSubmit={onSubmit}>
              <CardContent>
                <div>
                  <label>Email</label>
                  <Input {...register("email")} placeholder="Email" />
                  {errors?.email && <p>{errors.email.message}</p>}
                </div>

                <div>
                  <label>Password</label>
                  <Input {...register("password")} placeholder="Password" />
                </div>
              </CardContent>

              <CardActions>
                <Button type="submit" variant="outlined">
                  Submit
                </Button>
              </CardActions>
            </form>
          </Card>
        </div>
      </div> */}
    </Box>
  );
};

export default Login;
