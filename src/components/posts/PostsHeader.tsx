import * as React from "react";
import { styled } from "@mui/material/styles";
import { Paper, Chip } from "@mui/material";
import { useGetPostCategorysQuery } from "../../app/services/api";
import { filterByCategory } from "./postsSlice";
import { useAppDispatch } from "../../app/services/hooks";
import DateTimePickerField from "./DateTimePickerField";
const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function PostsHeader() {
  const { data: categorys = [] } = useGetPostCategorysQuery();
  const dispatch = useAppDispatch();
  const handleClick = (id: string) => {
    dispatch(filterByCategory({ id: id }));
  };
  return (
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
      <ListItem>
        <Chip label={"All"} onClick={() => handleClick("")} />
      </ListItem>
      {categorys.map((category) => {
        return (
          <ListItem key={category._id}>
            <Chip
              label={category.title}
              onClick={() => handleClick(category._id)}
            />
          </ListItem>
        );
      })}
      {/* <DateTimePickerField /> */}
    </Paper>
  );
}
