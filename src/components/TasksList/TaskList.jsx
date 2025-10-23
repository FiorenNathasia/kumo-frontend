import { useEffect, useState } from "react";
import axios from "axios";
import { List } from "@mui/material";
import Task from "../Task/Task";

function TaskList({ tasks }) {
  return (
    <>
      <List sx={{ width: "100%", maxWidth: 360 }}>
        {tasks.map((task) => {
          return <Task key={task.id} task={task} />;
        })}
      </List>
    </>
  );
}

export default TaskList;
