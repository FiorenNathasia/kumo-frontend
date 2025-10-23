import { useState } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

function Task({ task }) {
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
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          mb: 2,
          p: 2,
          borderRadius: 3,
          boxShadow: completed ? 1 : 3,
          opacity: completed ? 0.6 : 1,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow: 6,
            transform: "translateY(-2px)",
          },
        }}
      >
        <CardContent
          key={task.id}
          component={RouterLink}
          to={`/task/${task.id}`}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexBasis: "row",
              gap: "1rem",
            }}
          >
            <IconButton onClick={handleComplete} color="primary">
              {" "}
              {completed ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
            </IconButton>
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
              {task.notes && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {task.notes}
                </Typography>
              )}
              <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                Deadline: {formattedDeadline}
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </>
  );
}

export default Task;
