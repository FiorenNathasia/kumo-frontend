import { Box } from "@mui/material";
import MoodTask from "../MoodTask/MoodTask";

function MoodTasksList({ tasks, categories }) {
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
            <MoodTask
              key={task.id}
              task={task}
              categories={categories}
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

export default MoodTasksList;
