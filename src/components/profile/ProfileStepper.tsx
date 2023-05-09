import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { BasicInformation } from "./BasicInformation";
import Education from "./Education";
import Experience from "./Experience";
import { useAppDispatch, useAppSelector } from "../../app/services/hooks";
import { fetchProfile } from "./profileSlice";

const steps = ["Basic Information", "Education", "Experience"];

export default function ProfileStepper() {
  const profile = useAppSelector((state) => state.profile);
  const profileStatus = useAppSelector((state) => state.profile.status);
  const dispatch = useAppDispatch();
  React.useMemo(() => {
    if (profileStatus === "idle") {
      dispatch(fetchProfile());
    }
  }, [profileStatus, dispatch]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box className="mx-auto max-w-7xl px-6 lg:px-8 bg-gray-80 py-6 sm:py-12">
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 ? (
              <BasicInformation />
            ) : activeStep === 1 ? (
              <Education />
            ) : (
              <Experience />
            )}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              {activeStep !== 0 ? (
                <button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Back
                </button>
              ) : null}

              <Box sx={{ flex: "1 1 auto" }} />

              <button
                onClick={handleNext}
                className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 mr-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Next
              </button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <button
                    onClick={handleComplete}
                    className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
