import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { Box, Link, Typography, TextField, Stack, Button } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsLogin(true);
    const user = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        user
      );
      console.log(response);
      const accessToken = response.data.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      navigate("/mood");
    } catch (error) {
      setError(error.response.data.message);
    }
    setIsLogin(false);
  };

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "lightblue",
          position: "relative",
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "rgba(217, 217, 217, 0.5)",
            backdropFilter: "blur(10px)",
            height: "420px",
            width: "346px",
            borderStyle: "solid",
            border: "3px solid #4B51F4",
            gap: 2,
          }}
        >
          LOGIN
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Stack direction="column" spacing={2}>
            <Button variant="contained" onClick={handleSubmit}>
              Login
            </Button>
            <Typography variant="h3" sx={{ fontSize: "1rem" }}>
              Not a member yet?{" "}
              <Link href="/signup" component="a" sx={{ color: "#353AA8" }}>
                Signup Here
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default Login;
