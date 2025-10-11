import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Typography, Box } from "@mui/material";

function ProtectedRoute() {
  const token = localStorage.getItem("acessToken");
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
      <Box>
        <Typography>You are not authorised!</Typography>
        <Typography>You will be taken to the login page...</Typography>
      </Box>
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
