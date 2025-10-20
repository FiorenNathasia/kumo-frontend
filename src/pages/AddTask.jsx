import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import BottomNavigationTab from "../components/BottomNavigation/BottomNavigationTab";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddTask() {
  const [title, setTitle] = useState("");
  const [categoryName, setCategoryName] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [date, setDate] = useState(null);
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategoryName(typeof value === "string" ? value.split(",") : value);
  };
  const handleSubmit = async () => {
    setIsSaving(true);
    const token = localStorage.getItem("accessToken");
    const task = {
      title,
      categories: categoryName,
      difficulty,
      deadline: date,
      notes,
    };
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/task/newtask`,
        task,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setIsSaving(false);
  };

  const difficultyLevel = ["easy", "medium", "hard"];

  const categories = [
    {
      name: "Focus",
      description:
        "Tasks requiring concentration or mental effort (writing, studying, planning)",
    },
    {
      name: "Move",
      description:
        "Physical activity or movement tasks (exercise, walking, chores)",
    },
    {
      name: "Create",
      description:
        "Creative or hands-on tasks (drawing, coding, music, DIY projects)",
    },
    {
      name: "Connect",
      description: "Social tasks (call/text friends, meetings, collaboration)",
    },
    {
      name: "Organize",
      description: "Tidying, planning, scheduling, decluttering",
    },
    {
      name: "Urgent",
      description: "Time-sensitive tasks (deadlines, bills, appointments)",
    },
    {
      name: "Fun",
      description:
        "Entertainment, hobbies, or enjoyable activities (games, hobbies)",
    },
    {
      name: "Reflect",
      description: "Journaling, self-improvement, goal review",
    },
  ];

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "lightblue",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            width: 250,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <TextField
            required
            fullWidth
            id="outlined-required"
            label="Task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormControl fullWidth required>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              multiple
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categoryName}
              label="Category"
              onChange={handleCategoryChange}
              renderValue={(selected) => selected.join(", ")}
            >
              {categories.map((category) => {
                return (
                  <MenuItem key={category.name} value={category.name}>
                    <Box>
                      <Checkbox
                        checked={categoryName.includes(category.name)}
                      />
                      <Typography variant="subtitle1" fontWeight="bold">
                        {category.name}
                      </Typography>
                      <Typography variant="body2" sx={{ whiteSpace: "normal" }}>
                        {category.description}
                      </Typography>
                    </Box>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl required sx={{ m: 1, minWidth: 120 }} fullWidth>
            <InputLabel id="demo-simple-select-required-label">
              Difficulty
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={difficulty}
              label="Difficulty"
              onChange={(e) => setDifficulty(e.target.value)}
            >
              {difficultyLevel.map((level) => {
                return (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Deadline*"
                value={date}
                onChange={(newDate) => setDate(newDate)}
              />
            </DemoContainer>
          </LocalizationProvider>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            label="Notes"
            value={notes}
            minRows={4}
            onChange={(e) => setNotes(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Add
          </Button>
        </Box>
        <BottomNavigationTab />
      </Box>
    </>
  );
}
export default AddTask;
