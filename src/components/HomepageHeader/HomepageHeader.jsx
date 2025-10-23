import { Box, Typography } from "@mui/material";

function HomepageHeader({ firstName }) {
  return (
    <>
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "fixed",
          width: "100%",
          height: "10rem",
          top: 0,
          left: 0,
          zIndex: 1000,
          padding: "1rem 0",
          backgroundColor: "red",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: "2rem",
            fontWeight: "700",
            marginTop: "1rem",
          }}
        >
          KUMO
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: "500",
          }}
          variant="h2"
        >
          Welcome back {firstName}
        </Typography>
      </Box>
    </>
  );
}

export default HomepageHeader;
