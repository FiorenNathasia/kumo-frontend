import { useState } from "react";
import axios from "axios";
import { Box, Link, Typography, TextField, Stack, Button } from "@mui/material";
import MoodSelector from "../components/MoodSelector/MoodSelector";

function Moodpage() {
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [journal, setJournal] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleJournal = (newJournal) => {
    setJournal(newJournal);
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    const token = localStorage.getItem("accessToken");
    const entry = {
      selectedMoods,
      journal,
    };
    try {
      const { data } = await axios.post(
        `${import.meta.env / VITE_API_URL}/api/entry/newentry`,
        entry,
        { headers: { Authorization: "Bearer " + token } }
      );
      navigate("/");
    } catch (error) {
      setError(error.respose.data.message);
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
      </Box>
    </>
  );
}

export default Moodpage;
