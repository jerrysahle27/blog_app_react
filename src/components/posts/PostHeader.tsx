import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { useGetPostCategorysQuery } from "./PostSlice";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function PostHeader() {
  const {
    data: Categories = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostCategorysQuery();
  return (
    <Paper
      sx={{
        display: "flex",
        flexWrap: "wrap",
        listStyle: "none",
        justifyContent: "center",
        p: 0.5,
        m: 1,
      }}
      elevation={0}
      component="ul"
    >
      {Categories.map((data) => {
        return (
          <ListItem key={data.id}>
            <Chip label={data.title} color="primary" />
          </ListItem>
        );
      })}
    </Paper>
  );
}
