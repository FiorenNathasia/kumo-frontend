import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button } from "@mui/material";
import MoodSelector from "../components/MoodSelector/MoodSelector";
import BottomNavigationTab from "../components/BottomNavigation/BottomNavigationTab";
import Sidebar from "../components/Sidebar/Sidebar";
import AddTaskButton from "../components/AddTaskButton/AddTaskButton";

function Moodpage() {
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [journal, setJournal] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleJournal = (newJournal) => {
    setJournal(newJournal);
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    const token = localStorage.getItem("accessToken");
    const entry = {
      text: journal,
      moods: selectedMoods,
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/entry/newentry`,
        entry,
        { headers: { Authorization: "Bearer " + token } }
      );
      const journalEntryId = res.data.journalEntryId;
      if (journalEntryId) {
        localStorage.setItem("journalEntryId", journalEntryId.toString());
      }
      navigate(`/${journalEntryId}`, { state: { fromMoodPage: true } });
    } catch (error) {
      if (error.response?.status === 409) {
        alert("You already submitted your mood today!");
      } else {
        console.error(error);
      }
    }
    setIsSaving(false);
  };

  return (
    <>
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
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            outline: "2px green solid",
            width: { xs: 340, md: 500 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              outline: "2px red solid",
            }}
          >
            <MoodSelector
              selectedMoods={selectedMoods}
              setSelectedMoods={setSelectedMoods}
            />
          </Box>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            minRows={4}
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
        <AddTaskButton />
        <Sidebar />
        <BottomNavigationTab />
      </Box>
    </>
  );
}

export default Moodpage;
