import * as React from "react";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { BellIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { IconButton, Toolbar, Box, AppBar } from "@mui/material";
import AddPost from "../posts/AddPost";
import { googleLogout } from "@react-oauth/google";
import { clearCredentials } from "../auth/authSlice";
import { useAppDispatch } from "../../app/services/hooks";
import SearchComponent from "../../utils/SearchComponent";
import { useState } from "react";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: 128,
  },
}));

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dispatch = useAppDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const SignOut = () => {
    googleLogout();
    dispatch(clearCredentials);
    localStorage.clear();
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <StyledToolbar>
          <div className="flex flex-1 items-center">
            <Diversity3Icon/>
          </div>
          <SearchComponent
            searchText={searchText}
            setSearchText={setSearchText}
          />
          {/* <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold mr-1 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={handleClickOpen}
            >
              New Post
            </button>
            <button
              type="button"
              className="rounded-full bg-white p-1 text-gray-400 hover:text-blue focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

         
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white">
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src="" alt="" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/home/profile"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Your Profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/home/posts"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        posts
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                        onClick={() => SignOut()}
                      >
                        Sign out
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div> */}
        </StyledToolbar>
      </AppBar>
      <AddPost
        open={open}
        setOpen={setOpen}
        handleClickOpen={handleClickOpen}
      />
    </Box>
  );
}
