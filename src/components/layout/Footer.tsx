import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

export const Footer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "primary.main",
        paddingTop: "1rem",
        paddingBottom: "2rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="black" variant="h5"></Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="white" variant="subtitle1">
              {`@${new Date().getFullYear()}`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
