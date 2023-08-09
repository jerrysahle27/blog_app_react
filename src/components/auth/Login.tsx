import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import {
  Button,
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useLoginUserMutation,LoginRequest } from "../../app/services/api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "@mui/icons-material/Google";
import AlertNotification from "../../utils/AlertNotification";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState("");
  const signInSchema = yup.object().shape({
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
    resolver: yupResolver(signInSchema),
  });
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
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
          <p className="mb-12 text-center text-2xl font-semibold leading-6 text-gray-600 hover:text-gray-500 ">
            SignIn to your account
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
              <>
                <FormControl
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  error={errors?.password ? true : false}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    onChange={onChange}
                    value={value}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  {errors?.password ? (
                    <p
                      className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1wc848c-MuiFormHelperText-root"
                      id="password-helper-text"
                    >
                      {errors.password?.message}
                    </p>
                  ) : (
                    ""
                  )}
                </FormControl>
              </>
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
        <div className="flex flex-row justify-between">
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label={
              <p className="text-center text-sm text-gray-500">
                {" "}
                Remember Password
              </p>
            }
          />
          <Button onClick={() => navigate("/forgotpassword")}>
            Forgot Password?
          </Button>
        </div>
        <Button
          onClick={() => loginWithGoogle()}
          startIcon={<GoogleIcon />}
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
        >
          Sign in with Google{" "}
        </Button>
        <br />
        <p className="mt-10 text-center text-sm text-gray-500">
          Not have account?{" "}
          <a
            href="/register"
            className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
          >
            Create your account
          </a>
        </p>
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
