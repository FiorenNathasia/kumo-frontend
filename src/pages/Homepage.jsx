import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Stack,
  Button,
  BottomNavigation,
} from "@mui/material";
import MoodTasksList from "../components/MoodTasksLists/MoodTasksList";
import BottomNavigationTab from "../components/BottomNavigation/BottomNavigationTab";

const Homepage = () => {
  const [taskList, setTaskList] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setUser(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTasksList = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/task/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setTaskList(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPageData = async () => {
    await fetchUser();
    await fetchTasksList();
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

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
          sx={{
            outline: "2px green solid",
            width: { xs: 340, md: 500 },
            maxHeight: "90vh",
            overflow: "auto",
          }}
        >
          Hello
          <Typography>Welcome Back {user.firstName}</Typography>
          <MoodTasksList tasks={taskList} fetchTasks={fetchTasksList} />
        </Box>
        <BottomNavigationTab />
      </Box>
    </>
  );
};

export default Homepage;
