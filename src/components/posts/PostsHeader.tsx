import * as React from "react";
import { styled } from "@mui/material/styles";
import { Paper, Chip, Button } from "@mui/material";
import { useGetPostCategorysQuery } from "./PostSlice";
import AddPostCategory from "./AddPostCategory";
import AddIcon from "@mui/icons-material/Add";
const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function PostsHeader() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
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
        justifyContent: "space-between",
        flexWrap: "wrap",
        listStyle: "none",
        p: 1.5,
        m: 0,
      }}
    >
      {categorys.map((data) => {
        return (
          <ListItem key={data.id}>
            <Chip label={data.title} />
          </ListItem>
        );
      })}
      <div className="justify-self-end">
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
          New Post Category
        </Button>
      </div>
    </Paper>
  );
}
