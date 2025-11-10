import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, IconButton, useTheme } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function AddTaskButton() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  const handleClick = () => {
    navigate("/addtask");
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: "4rem",
          right: "5rem",
          display: { xs: "none", sm: "block" },
        }}
      >
        <IconButton
          onClick={handleClick}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,
            },
            width: "4rem",
            height: "4rem",
            boxShadow: 3,
          }}
        >
          <AddCircleOutlineIcon sx={{ fontSize: "3rem" }} />
        </IconButton>
      </Box>
    </>
  );
}

export default AddTaskButton;
