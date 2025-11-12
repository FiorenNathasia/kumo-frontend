import { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

function MoodTask({ task, categories, index, cardHeight, overlap }) {
  const [completed, setCompleted] = useState(task.completed);

  const formattedDeadline = task.deadline
    ? format(new Date(task.deadline), "d MMM, yyyy")
    : "No deadline";

  const handleComplete = async () => {
    const token = localStorage.getItem("accessToken");
    const newStatus = !completed;
    setCompleted(newStatus);

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/task/${task.id}/completed`,
        { completed: newStatus },
        { headers: { Authorization: "Bearer " + token } }
      );
    } catch (error) {
      setCompleted(!newStatus);
    }
  };

  const categoryColors = {
    Focus: "#d0f0fd",
    Move: "#d0ffd6",
    Create: "#fff3cd",
    Connect: "#ffd6d6",
    Organize: "#e0e0e0",
    Urgent: "#f8d7da",
    Fun: "#fce5cd",
    Reflect: "#e0d7fd",
  };

  const taskCategory = categories.find((cat) => cat.task_id === task.id);
  const cardColor = categoryColors[taskCategory.categoryName];

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          position: "absolute",
          backgroundColor: cardColor || "#fff",
          bottom: index * (cardHeight - overlap),
          width: { xs: 320, md: 480 },
          height: cardHeight,
          p: 2,
          borderRadius: 3,
          opacity: completed ? 1 : 1,
          transition: "all 0.3s ease",
          zIndex: 100 - index,
          overflow: "hidden",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
          }}
        >
          <IconButton onClick={handleComplete} color="primary">
            {completed ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
          </IconButton>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexBasis: "row",
                gap: "1rem",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    textDecoration: completed ? "line-through" : "none",
                    fontWeight: "bold",
                  }}
                >
                  {task.title}
                </Typography>

                <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                  Deadline: {formattedDeadline}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Box>

        {task.notes && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            {task.notes}
          </Typography>
        )}
      </Card>
    </>
  );
}

export default MoodTask;
