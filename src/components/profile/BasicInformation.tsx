import * as React from "react";
import { TextField, Box, Autocomplete } from "@mui/material";
import { ProfileModel } from "./ProfileModel";
import { addNewProfile, fetchProfile, selectProfile } from "./profileSlice";
import { useAppDispatch, useAppSelector } from "../../app/services/hooks";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Controller, useForm } from "react-hook-form";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const BasicInformation = () => {
  const profile = useAppSelector(selectProfile);
  const { control, setValue, handleSubmit } = useForm<ProfileModel>();
  const profileStatus = useAppSelector((state) => state.profile.status);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const dispatch = useAppDispatch();
  const onSubmit = handleSubmit((data) =>
    dispatch(addNewProfile(data))
      .unwrap()
      .then((payload) => setOpenSuccess(true))
      .catch((error) => setOpenError(true))
  );
  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    openSuccess === true ? setOpenSuccess(false) : setOpenError(false);
  };
  const skill = ["Programming", "Management", "Self Esteem"];
  React.useEffect(() => {
    if (profileStatus === "idle") {
      dispatch(fetchProfile());
    } else {
      Object.entries(profile).forEach(([key, value]) => {
        // setValue(key,value);
        // setValue(`${key}`,` ${value}`);
      });
    }
  }, [dispatch, profileStatus, profile, setValue]);
  return (
    <Box className="mx-auto max-w-7xl px-6 lg:px-8 ">
      <div className="relative mt-8 flex items-center gap-x-4">
        <img
          src={profile.user?.avatar}
          alt=""
          className="h-10 w-10 rounded-full bg-gray-50"
        />
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <a href="/">
              <span className="absolute inset-0" />
              {profile.user?.name}
            </a>
          </p>
          <p className="text-gray-600">{profile.user?.email}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <form onSubmit={onSubmit}>
          <Controller
            name="skill"
            control={control}
            defaultValue={[]}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                disablePortal
                options={skill}
                className="mt-4"
                getOptionLabel={(option) => option}
                value={value}
                multiple
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Skills"
                    label={"Skills"}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
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
                className="mb-4"
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
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Save
          </button>
        </form>
      </div>
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Profile Created Successfully !
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Something went wrong !
        </Alert>
      </Snackbar>
    </Box>
  );
};
