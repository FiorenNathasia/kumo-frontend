import { Box } from "@mui/material";
import Task from "../Task/Task";

function TaskList({ tasks, fetchTasks }) {
  const cardHeight = 200;
  const overlap = 105;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column-reverse",
          justifyContent: "center",
          width: { xs: 330, md: 500 },
          height: { xs: 370, md: 600 },
          overflow: "auto",
          position: "relative",
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
              overlap={overlap}
            />
          );
        })}
      </Box>
    </>
  );
}

export default TaskList;
