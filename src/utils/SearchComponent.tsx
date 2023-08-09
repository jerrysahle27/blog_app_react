import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch } from "../app/services/hooks";
import { filterByText } from "../components/posts/postsSlice";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.9),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.9),
  },
  alignItems: "center",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "primary",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(5)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export interface SearchComponentProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchComponent({
  searchText,
  setSearchText,
}: SearchComponentProps) {
  const dispatch = useAppDispatch();
  const handleChange = (value: string) => {
    setSearchText(value);
    dispatch(filterByText(searchText));
  };
  return (
    <Box sx={{ flexGrow: 1, alignItems: "center" }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon color="primary" />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          onChange={(e) => handleChange(e.target.value)}
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </Box>
  );
}
