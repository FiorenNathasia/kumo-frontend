import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Link, Typography, TextField, Stack, Button } from "@mui/material";
import MoodSelector from "../components/MoodSelector/MoodSelector";

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

      const { journalEntryId } = res.data;
      console.log("API URL:", import.meta.env.VITE_API_URL);

      navigate(`/${journalEntryId}`);
    } catch (error) {
      console.log(error);
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
      </Box>
    </>
  );
}

export default Moodpage;
