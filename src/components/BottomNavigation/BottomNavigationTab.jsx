import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import HomeIcon from "@mui/icons-material/Home";

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

  const moodpage = () => {
    navigate("/mood");
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
          value="Add Task"
          icon={<AddCircleIcon />}
        />
        <BottomNavigationAction
          label="Add Mood"
          value={moodpage}
          icon={<AddReactionIcon />}
        />
      </BottomNavigation>
    </>
  );
}

export default BottomNavigationTab;
