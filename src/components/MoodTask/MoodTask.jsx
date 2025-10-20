import { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Typography,
} from "@mui/material";

function MoodTask({ task }) {
  const [completed, setCompleted] = useState(task.completed);

  const formattedDeadline = task.deadline
    ? format(new Date(task.deadline), "d MMM, yyyy")
    : "No deadline";

  const handleComplete = async () => {
    const token = localStorage.getItem("accessToken");
    const newStatus = !completed;

    // Optimistically update the UI
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
      <ListItem key={task.id}>
        <ListItemButton>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={completed}
              tabIndex={-1}
              disableRipple
              onChange={handleComplete}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="subtitle1" fontWeight="bold">
                {task.title}
              </Typography>
            }
            secondary={
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {task.notes}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Deadline: {formattedDeadline}
                </Typography>
              </Box>
            }
          />
        </ListItemButton>
      </ListItem>
    </>
  );
}

export default MoodTask;
