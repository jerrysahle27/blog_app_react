import * as React from "react";
import { styled } from "@mui/material/styles";
import { Paper, Chip } from "@mui/material";
import { BasicInformation } from "./BasicInformation";
import Education from "./Education";
import { Experience } from "./Experience";
const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ProfileTab() {
  const profiles = ["Basic Information", "Education", "Experience"];
  const [showFirstTab, setShowFirstTab] = React.useState(false);
  const [showSecondTab, setShowSecondTab] = React.useState(false);
  const [showThirdTab, setShowThirdTab] = React.useState(false);
  const handleClick = (text: string) => {
    switch (text) {
      case "Basic Information":
        setShowFirstTab(true);
        setShowSecondTab(false);
        setShowThirdTab(false);
        break;
      case "Experience":
        setShowFirstTab(false);
        setShowSecondTab(false);
        setShowThirdTab(true);
        break;
      case "Education":
        setShowFirstTab(false);
        setShowSecondTab(true);
        setShowThirdTab(false);
        break;
      default:
        setShowFirstTab(true);
        setShowSecondTab(false);
        setShowThirdTab(true);
    }
  };
  return (
    <React.Fragment>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          justifyItems: "stretch",
          flexWrap: "wrap",
          listStyle: "none",
          p: 1.5,
          m: 0,
        }}
      >
        {profiles.map((profile) => {
          return (
            <ListItem key={profile}>
              <Chip label={profile} onClick={() => handleClick(profile)} />
            </ListItem>
          );
        })}
      </Paper>

      <div className="w-full mx-auto max-w-7xl px-6 lg:px-8 ">
        {showSecondTab ? (
          <Education />
        ) : showThirdTab ? (
          <Experience />
        ) : (
          <BasicInformation />
        )}
      </div>
    </React.Fragment>
  );
}
