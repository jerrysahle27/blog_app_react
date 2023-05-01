import * as React from "react";
import { styled } from "@mui/material/styles";
import { Paper, Chip, Button } from "@mui/material";
import { useGetPostCategorysQuery } from "../../app/services/api";
import DateTimePickerField from "./DateTimePickerField";
const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function PostsHeader() {
  const {
    data: categorys = [],
  } = useGetPostCategorysQuery();

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 1.5,
        m: 0,
      }}
    >
      {categorys.map((data) => {
        return (
          <ListItem key={data.id}>
            <Chip label={data.title}  />
          </ListItem>
        );
      })}
      <DateTimePickerField />
    </Paper>
  );
}
