import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import MoodTasksList from "../components/MoodTasksLists/MoodTasksList";

function MoodDashboard() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(id);

  useEffect(() => {
    if (!id) return;
    const fecthData = async () => {
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
        console.log(response.data);
        console.log(response.data.tasks);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fecthData();
  }, [id]);

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
    </>
  );
}

export default MoodDashboard;
