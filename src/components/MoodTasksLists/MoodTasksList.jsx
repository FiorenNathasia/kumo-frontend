import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  Card,
} from "@mui/material";
import MoodTask from "../MoodTask/MoodTask";

function MoodTasksList({ tasks }) {
  return (
    <>
      <List sx={{ width: "100%" }}>
        {tasks.map((task) => {
          return <MoodTask key={task.id} task={task} />;
        })}
      </List>
    </>
  );
}

export default MoodTasksList;
