import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { useGetPostCategorysQuery } from "./PostSlice";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function PostsHeader() {
  const {
    data: categorys = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostCategorysQuery();

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        // p: 10.5,
        // m: 0,
      }}
    >
      {categorys.map((data) => {
        return (
          <ListItem key={data.id}>
            <Chip label={data.title} />
          </ListItem>
        );
      })}
    </Paper>
  );
}
