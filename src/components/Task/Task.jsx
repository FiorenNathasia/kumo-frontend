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
import DeleteIcon from "@mui/icons-material/Delete";

function Task({ task, fetchTasks, index, cardHeight, overlap }) {
  const [completed, setCompleted] = useState(task.completed);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

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

  const handleDelete = async () => {
    setIsDeleting(true);
    const token = localStorage.getItem("accessToken");
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/task/${task.id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      await fetchTasks();
    } catch (error) {
      console.log(error);
    }
    setIsDeleting(false);
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
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          position: "absolute",
          backgroundColor: categoryColors[task.categoryName] || "#fff",
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
            transform: "translateY(-8px)",
            zIndex: 200,
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
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    textDecoration: completed ? "line-through" : "none",
                    fontWeight: "bold",
                  }}
                >
                  {task.title}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    mt: 1,
                    textDecoration: completed ? "line-through" : "none",
                  }}
                >
                  Due: {formattedDeadline}
                </Typography>
              </Box>
            </Box>
          </CardContent>
          <CardActions>
            <IconButton variant="contained" color="neutral" sx={{ mr: "auto" }}>
              <DeleteIcon
                variant="contained"
                onClick={handleDelete}
                disabled={isDeleting}
                sx={{
                  fontSize: "1.5rem",
                  color: "#919192",
                  display: "flex",
                }}
              ></DeleteIcon>
            </IconButton>
          </CardActions>
        </Box>
        {task.notes && (
          <Typography variant="body2" sx={{ mt: 1, ml: 7 }}>
            {task.notes}
          </Typography>
        )}
      </Card>
    </>
  );
}

export default Task;
