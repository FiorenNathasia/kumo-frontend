import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import MoodTasksList from "../components/MoodTasksLists/MoodTasksList";
import GradientBackground from "../components/GradientBackground/GradientBackground";

function MoodDashboard() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [tone, setTone] = useState(null);
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
      <GradientBackground tone={tone}>
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            position: "relative",
            overflow: "hidden",
            display: "flex",
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
            <Typography sx={{ outline: "red solid 2px" }}>
              {data.recommendation.message}
            </Typography>
            <MoodTasksList tasks={data.tasks} />
          </Box>
        </Box>
      </GradientBackground>
    </>
  );
}

export default MoodDashboard;
