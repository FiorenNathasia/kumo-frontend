import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";

function BottomNavigationTab() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState("Home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const homepage = () => {
    navigate("/");
  };

  const taskpage = () => {
    navigate("/addtask");
  };

  const moodpage = () => {
    navigate("/mood");
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };
  return (
    <>
      <BottomNavigation
        sx={{
          width: "100%",
          height: 70,
          position: "fixed",
          bottom: 0,
          left: 0,
          borderTop: "1px solid #ddd",
          backgroundColor: "#fff",
          zIndex: 10,
        }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Home"
          value={homepage}
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="Add Task"
          value={taskpage}
          icon={<AddCircleIcon />}
        />
        <BottomNavigationAction
          label="Add Mood"
          value={moodpage}
          icon={<AddReactionIcon />}
        />
        <BottomNavigationAction
          label="Logout"
          value={logout}
          icon={<LogoutIcon />}
        />
      </BottomNavigation>
    </>
  );
}

export default BottomNavigationTab;
