import { useEffect, useRef } from "react";
import axios from "axios";
import { List, Box } from "@mui/material";
import Task from "../Task/Task";

function TaskList({ tasks, fetchTasks }) {
  const cardHeight = 120;
  const containerHeight = Math.max(tasks.length * cardHeight, 400);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: 320,
          height: containerHeight,
        }}
      >
        {tasks.map((task, index) => {
          return (
            <Task
              key={task.id}
              task={task}
              fetchTasks={fetchTasks}
              index={index}
              cardHeight={cardHeight}
            />
          );
        })}
      </Box>
    </>
  );
}

export default TaskList;
