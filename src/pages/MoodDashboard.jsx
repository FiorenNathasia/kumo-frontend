import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import MoodTasksList from "../components/MoodTasksLists/MoodTasksList";
import BottomNavigationTab from "../components/BottomNavigation/BottomNavigationTab";
import MoodHeader from "../components/MoodHeader/MoodHeader";
import GradientIntro from "../components/GradientIntro/GradientIntro";
import Sidebar from "../components/Sidebar/Sidebar";
import AddTaskButton from "../components/AddTaskButton/AddTaskButton";

function MoodDashboard() {
  const { id } = useParams();
  const location = useLocation();
  const fromMoodPage = location.state?.fromMoodPage;
  const [data, setData] = useState(null);
  const [tone, setTone] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/entry/recommendation/${id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setData(response.data);
        setTone(response.data.recommendation.energy_level);
        setMessage(response.data.recommendation.message);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  if (isLoading || tone === null) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <GradientIntro tone={tone} showAnimation={fromMoodPage}>
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            position: "relative",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MoodHeader message={message} />

          <Box
            sx={{
              outline: "2px green solid",
              width: { xs: 310, md: 500 },
              height: { xs: 370, md: 600 },
              marginTop: { xs: 16, md: 0 },
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <MoodTasksList tasks={data.tasks} />
          </Box>
          <AddTaskButton />
          <Sidebar />
          <BottomNavigationTab />
        </Box>
      </GradientIntro>
    </>
  );
}

export default MoodDashboard;
