import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { Button, Avatar, TextField, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import LockOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { useLoginUserMutation } from "../../app/services/api";
import type { LoginRequest } from "../../app/services/api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "@mui/icons-material/Google";
import AlertNotification from "../../utils/AlertNotification";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState("");
  const SignupSchema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
  });
  const [login] = useLoginUserMutation();
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(SignupSchema),
  });
  const onSubmit = handleSubmit(async () => {
    try {
      const user = await login(getValues()).unwrap();
      dispatch(setCredentials(user));
      setOpenSuccess(true);
      setMessage("Logged In Successfully");
      navigate("/home/posts");
    } catch (err) {
      console.error(err);
    }
  });

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => {
      navigate("/home/posts");
      const GoogleResponseCredential = {
        success: true,
        token: codeResponse.access_token,
      };
      dispatch(setCredentials(GoogleResponseCredential));
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  return (
    <Box>
      <div className="px-4 py-48 sm:px-6 lg:px-8 max-w-lg mx-auto  bg-gray rounded-xl shadow-lg hover:shadow-2xl items-center">
        <div className="relative">
          <Avatar className="mx-auto">
            <LockOutlinedIcon />
          </Avatar>
        </div>
        <form onSubmit={onSubmit}>
          <Controller
            name={"email"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                margin="normal"
                id="email"
                helperText={errors?.email ? errors.email.message : ""}
                error={errors?.email ? true : false}
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
                helperText={errors?.password ? errors.password.message : ""}
                error={errors?.password ? true : false}
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
        <p className="mt-10 text-center text-sm text-gray-500">
          Not have account?{" "}
          <a
            href="/register"
            className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
          >
            Create your account
          </a>
        </p>
        <br />
        <Button
          onClick={() => loginWithGoogle()}
          startIcon={<GoogleIcon />}
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
        >
          Sign in with Google{" "}
        </Button>
      </div>

      <AlertNotification
        openSuccess={openSuccess}
        openError={openError}
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        message={message}
      />
    </Box>
  );
};

export default Login;
