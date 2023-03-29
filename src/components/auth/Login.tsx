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
  Box,
} from "@mui/material";
import { useForm, Resolver } from "react-hook-form";
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
      <div className="container mx-auto bg-indigo-300">
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
      </div>
    </Box>
  );
};

export default Login;
