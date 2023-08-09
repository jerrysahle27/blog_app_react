import { Button, TextField } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation, UserRequest } from "../../app/services/api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AlertNotification from "../../utils/AlertNotification";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [register, { isSuccess }] = useRegisterUserMutation();
  const signUpSchema = yup.object().shape({
    email: yup.string().required(),
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
    <div className="px-4 py-48 sm:px-6 lg:px-8 max-w-lg mx-auto flex flex-col space-x-4 bg-white rounded-xl shadow-lg hover:shadow-2xl items-center">
      <div className="relative">
        <p className="mb-12 text-center text-xl font-bold tracking-tight">
          Forgot Password
        </p>
      </div>
      <div>
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send Reset Link
          </Button>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Remember your credentials?{" "}
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

export default ForgotPassword;
