import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation, UserRequest } from "../../app/services/api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AlertNotification from "../../utils/AlertNotification";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((showPassword) => !showPassword);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const [register, { isSuccess }] = useRegisterUserMutation();
  const signUpSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    password2: yup.string().required(),
  });
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<UserRequest>({
    resolver: yupResolver(signUpSchema),
  });
  const onSubmit = handleSubmit(async () => {
    try {
      console.log(getValues());
      await register(getValues())
        .unwrap()
        .then((payload) => {
          setOpenSuccess(true);
          setMessage("Account Registered Successfully");
          navigate("/login");
        });
    } catch (err) {
      console.error(err);
      setOpenError(true);
    }
  });
  return (
    <div className="px-4 py-36 sm:px-6 lg:px-8 max-w-lg mx-auto flex flex-col space-x-4 bg-white rounded-xl shadow-lg hover:shadow-2xl items-center">
      <div className="relative">
        <p className="mb-12 text-center text-2xl font-semibold leading-6 text-gray-600 hover:text-gray-500">
          Create Account
        </p>
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <Controller
            name={"name"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                margin="normal"
                id="name"
                fullWidth
                helperText={errors?.name ? errors.name.message : ""}
                error={errors?.name ? true : false}
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
          <Controller
            name={"password2"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <FormControl
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  error={errors?.password2 ? true : false}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={onChange}
                    value={value}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                  />
                  {errors?.password2 ? (
                    <p
                      className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1wc848c-MuiFormHelperText-root"
                      id="password-helper-text"
                    >
                      {errors.password2?.message}
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
            Sign Up
          </Button>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have account?{" "}
          <a
            href="/login"
            className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
          >
            Login
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
    </div>
  );
};

export default Register;
