import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

function BottomNavigationTab() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);
  const [journalEntryId, setJournalEntryId] = useState(null);

  useEffect(() => {
    const savedId = localStorage.getItem("journalEntryId");
    if (savedId) setJournalEntryId(savedId);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "/logout") {
      localStorage.removeItem("accessToken");
      navigate("/login");
    } else {
      navigate(newValue);
    }
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
          label="Task Homepage"
          value="/"
          icon={<HomeIcon />}
        />

        <BottomNavigationAction
          label="Today's Recommendation"
          value={`/${journalEntryId}`}
          icon={<EmojiObjectsIcon />}
        />

        <BottomNavigationAction
          label="Add Task"
          value="/addtask"
          icon={<AddCircleIcon />}
        />
        <BottomNavigationAction
          label="Add Mood"
          value="/mood"
          icon={<AddReactionIcon />}
        />
        <BottomNavigationAction
          label="Logout"
          value="/logout"
          icon={<LogoutIcon />}
        />
      </BottomNavigation>
    </>
  );
}

export default BottomNavigationTab;
