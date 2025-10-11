import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Typography, Box } from "@mui/material";

function ProtectedRoute() {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [token]);

  if (!token) {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "lightblue",
          position: "relative",
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography>You are not authorised!</Typography>
          <Typography>You will be taken to the login page...</Typography>
        </Box>
      </Box>
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
