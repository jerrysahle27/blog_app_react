import * as React from "react";
import { Typography, Container, Link, Box, CssBaseline } from "@mui/material";


function Copyright() {
  return (
    <Typography variant="body2">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        {/* Your Website */}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: 128,
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            Social Network Site for developers.
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}
